'use client';

import styles from './ProductImageGallery.module.css';
import Image from 'next/image';

interface ProductImageGalleryProps {
    images: string[];
    title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
    return (
        <div className={styles.gallery}>
            {images.map((img, index) => (
                <div key={index} className={styles.imageWrapper}>
                    <Image
                        src={img}
                        alt={`${title} - View ${index + 1}`}
                        fill
                        className={styles.image}
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            ))}
        </div>
    );
}
