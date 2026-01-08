'use client';

import { useState } from 'react';
import styles from './ProductInfo.module.css';
import { useCart } from '@/context/CartContext';

interface ProductInfoProps {
  productId: string;
  variantId: string;
  title: string;
  price: number;
  description: string;
}

const SIZES = ['S', 'M', 'L', 'XL'];

export default function ProductInfo({ productId, variantId, title, price, description }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const { addToCart } = useCart();

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      productId,
      variantId,
      title,
      price,
      image: '/images/products/navy-tack-pant.jpg', // Placeholder
      size: selectedSize
    });
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.price}>${price.toFixed(2)}</div>

      {/* Size Selector */}
      <div className={styles.sizeSection}>
        <span className={styles.sectionLabel}>Size</span>
        <div className={styles.sizeGrid}>
          {SIZES.map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add To Cart */}
      <button
        className={styles.addToCartBtn}
        disabled={!selectedSize}
        onClick={handleAddToCart}
      >
        {selectedSize ? `ADD TO CART - $${price.toFixed(2)}` : 'SELECT SIZE'}
      </button>

      {/* Accordions */}
      <div className={styles.accordions}>
        {/* Description */}
        <div className={styles.accordionItem}>
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion('description')}
          >
            <span>DESCRIPTION</span>
            <span className={styles.icon}>{openAccordion === 'description' ? '−' : '+'}</span>
          </button>
          <div className={`${styles.accordionContent} ${openAccordion === 'description' ? styles.open : ''}`}>
            <p>{description}</p>
          </div>
        </div>

        {/* Size & Fit */}
        <div className={styles.accordionItem}>
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion('size')}
          >
            <span>SIZE & FIT</span>
            <span className={styles.icon}>{openAccordion === 'size' ? '−' : '+'}</span>
          </button>
          <div className={`${styles.accordionContent} ${openAccordion === 'size' ? styles.open : ''}`}>
            <p>Model is 6&apos;1&quot; and wears size L.</p>
          </div>
        </div>

        {/* Returns */}
        <div className={styles.accordionItem}>
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion('returns')}
          >
            <span>RETURNS</span>
            <span className={styles.icon}>{openAccordion === 'returns' ? '−' : '+'}</span>
          </button>
          <div className={`${styles.accordionContent} ${openAccordion === 'returns' ? styles.open : ''}`}>
            <div className={styles.shippingInfo}>
              <p>Free standard shipping on orders over $150.</p>
              <p>Returns accepted within 30 days of delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
