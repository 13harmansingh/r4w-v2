import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build', {
    apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Webhook signature verification failed:', errorMessage);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    interface MetadataItem {
        productId: string;
        variantId: string;
        size: string;
        quantity: number;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log('Payment successful for session:', session.id);

            // Retrieve line items to get names and prices
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const metadataItems: MetadataItem[] = JSON.parse(session.metadata?.items_metadata || '[]');
            const userId = session.metadata?.userId || null;

            try {
                // Create order in database
                await prisma.order.create({
                    data: {
                        userId: userId, // Link order to user if authenticated
                        stripeSessionId: session.id,
                        stripePaymentId: session.payment_intent as string,
                        email: session.customer_email || session.customer_details?.email || 'unknown',
                        status: 'PROCESSING',
                        subtotal: (session.amount_subtotal || 0) / 100,
                        shipping: (session.total_details?.amount_shipping || 0) / 100,
                        tax: (session.total_details?.amount_tax || 0) / 100,
                        total: (session.amount_total || 0) / 100,
                        currency: session.currency?.toUpperCase() || 'USD',
                        items: {
                            create: metadataItems.map((item, index) => {
                                const lineItem = lineItems.data[index];
                                return {
                                    productId: item.productId,
                                    variantId: item.variantId,
                                    name: lineItem?.description || 'Unknown Product',
                                    size: item.size,
                                    quantity: item.quantity,
                                    price: (lineItem?.price?.unit_amount || 0) / 100,
                                };
                            }),
                        },
                    },
                });
                console.log('Order created successfully for session:', session.id);
            } catch (dbError) {
                console.error('Error creating order in database:', dbError);
                // Stripe will retry if we return a non-200, but we might want to return 200 to acknowledge receipt
                // and handle the error internally if we don't want retries for DB errors.
                // However, returning 500 is safer for data consistency.
                return NextResponse.json({ error: 'Database error' }, { status: 500 });
            }

            break;
        }

        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            break;
        }

        case 'payment_method.attached': {
            const paymentMethod = event.data.object as Stripe.PaymentMethod;
            console.log(`PaymentMethod ${paymentMethod.id} attached to customer!`);
            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('Payment failed:', paymentIntent.id);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
