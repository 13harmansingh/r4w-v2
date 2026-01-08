'use client';

import styles from './ProductCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
    id: string;
    variantId?: string;
    title: string;
    price: number;
    images: string[];
    slug: string;
    isNew?: boolean;
}

export default function ProductCard({ id, variantId = 'v1', title, price, images, slug, isNew }: ProductCardProps) {
    const { addToCart } = useCart();

    // Safety check for images
    const mainImage = images?.[0] || '/images/products/navy-tack-pant-1.jpg'; // Fallback
    const hoverImage = images?.[1];

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: id,
            variantId: variantId,
            title,
            price,
            image: mainImage,
            size: 'M' // Default size for quick add
        });
    };

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Top Info Row */}
            <div className={styles.topInfo}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.price}>${price.toFixed(2)}</span>
            </div>

            {/* Image Container */}
            <Link href={`/product/${slug}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    {/* Main Image */}
                    <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />

                    {/* Hover Image (if exists) */}
                    {hoverImage && (
                        <Image
                            src={hoverImage}
                            alt={`${title} - Alternate View`}
                            fill
                            className={styles.hoverImage}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    {/* New Badge */}
                    {isNew && <span className={styles.badge}>NEW</span>}

                    {/* Quick Add Overlay */}
                    <button
                        className={styles.quickAddBtn}
                        onClick={handleQuickAdd}
                    >
                        QUICK ADD +
                    </button>
                </div>
            </Link>
        </motion.div>
    );
}
