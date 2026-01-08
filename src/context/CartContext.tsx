'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string; // Unique ID (product slug + size?)
    productId: string;
    variantId: string;
    title: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
        setItems((prev) => {
            // Create a unique ID based on title + size
            const itemId = `${newItem.title}-${newItem.size}`;

            const existing = prev.find((i) => i.id === itemId);
            if (existing) {
                return prev.map((i) =>
                    i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...newItem, id: itemId, quantity: 1 }];
        });
        openCart(); // Auto open on add
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, isCartOpen, openCart, closeCart, addToCart, removeFromCart, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
