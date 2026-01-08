'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
    const { items, isCartOpen, closeCart, removeFromCart, subtotal } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items.map(item => ({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        image: item.image,
                        variantId: item.variantId,
                        productId: item.productId,
                    })),
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong with the checkout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Prevent background scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`${styles.backdrop} ${isCartOpen ? styles.backdropOpen : ''}`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ''}`}>

                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.title}>Cart ({items.length})</span>
                    <button onClick={closeCart} className={styles.closeBtn}>Close</button>
                </div>

                {/* Items */}
                <div className={styles.itemsList}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>Your cart is empty.</div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.imageWrapper}>
                                    <Image src={item.image} alt={item.title} fill className={styles.image} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemTop}>
                                        <span className={styles.itemTitle}>{item.title}</span>
                                        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                    </div>
                                    <span className={styles.itemSize}>Size: {item.size}</span>
                                    <div className={styles.itemControls}>
                                        <span className={styles.quantity}>Qty: {item.quantity}</span>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotalRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <button
                            className={styles.checkoutBtn}
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? 'PROCESSING...' : 'CHECKOUT'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
