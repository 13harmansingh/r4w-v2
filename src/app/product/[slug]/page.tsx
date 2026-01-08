import styles from './page.module.css';
import ProductImageGallery from '@/components/Product/ProductImageGallery';
import ProductInfo from '@/components/Product/ProductInfo';
import Footer from '@/components/Footer/Footer';

import { products } from '@/data/products';

function getProduct(slug: string) {
    const product = products.find(p => p.slug === slug);
    if (!product) {
        return null; // Handle 404 in component
    }
    return product;
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;

    const product = getProduct(slug);

    if (!product) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>Product Not Found</h1>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Left: Scrollable Images */}
                <div className={styles.galleryCol}>
                    <ProductImageGallery images={product.images} title={product.title} />
                </div>

                {/* Right: Sticky Info */}
                <div className={styles.infoCol}>
                    <div className={styles.stickyWrapper}>
                        <ProductInfo
                            productId={product.id}
                            variantId={product.variantId || 'v1'}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
