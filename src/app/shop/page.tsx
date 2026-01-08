import styles from './page.module.css';
import ShopFilters from '@/components/Shop/ShopFilters';
import ProductCard from '@/components/Shop/ProductCard';
import Footer from '@/components/Footer/Footer';
import { Suspense } from 'react';

import { products } from '@/data/products';


export default function ShopPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Page Header */}
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Shop</h1>
                    <p className={styles.pageDesc}>
                        Explore ЯДШ&apos;s premium lifestyle clothing catalog, featuring high-end casual wear for the modern individual.
                    </p>
                </div>

                {/* Filters */}
                <Suspense fallback={<div>Loading filters...</div>}>
                    <ShopFilters />
                </Suspense>

                {/* Product Grid */}
                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
