import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build', {
    apiVersion: '2025-02-24.acacia',
});

interface CheckoutItem {
    productId: string;
    variantId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image?: string;
}

export async function POST(request: NextRequest) {
    try {
        const { items, email }: { items: CheckoutItem[], email?: string } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items in cart' },
                { status: 400 }
            );
        }

        // Create line items for Stripe
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: `Size: ${item.size}`,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
        }));

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: user?.email || email,
            metadata: {
                userId: user?.id || '',
                // Store serialized items or just IDs if many items
                items_metadata: JSON.stringify(items.map((item) => ({
                    productId: item.productId,
                    variantId: item.variantId,
                    size: item.size,
                    quantity: item.quantity
                })))
            },
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'PT', 'ES', 'IT'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 3,
                            },
                        },
                    },
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shop`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe checkout error details:', error);
        return NextResponse.json(
            { error: error?.message || 'Error creating checkout session' },
            { status: 500 }
        );
    }
}
