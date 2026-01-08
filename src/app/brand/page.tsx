import styles from './page.module.css';
import Footer from '@/components/Footer/Footer';


export default function BrandPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <h1 className={styles.title}>Our Brand</h1>
                </header>

                {/* Founder Section */}
                <section className={styles.section}>
                    <div className={styles.labelColumn}>
                        <span className={styles.label}>Founder</span>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.imageWrapper}>
                            {/* Placeholder for brand image */}
                            <div style={{ width: '100%', height: '400px', background: '#f0f0f0' }} />
                        </div>
                        <h2 className={styles.subTitle}>
                            Redefining Modern Luxury Through Conceptual Design.
                        </h2>
                        <div className={styles.grid2}>
                            <p className={styles.text}>
                                ЯДШ was founded on the principle that clothing should be an intellectual pursuit. We strip away the unnecessary to reveal the essential structure of the garment.
                            </p>
                            <p className={styles.text}>
                                Inspired by brutalist architecture and minimalist art, our collections serve as a canvas for self-expression, not a costume.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sustainability Section */}
                <section className={styles.section}>
                    <div className={styles.labelColumn}>
                        <span className={styles.label}>New York</span>
                    </div>
                    <div className={styles.contentColumn}>
                        <h2 className={styles.subTitle}>
                            Sustainable Style: We Source Only the Finest Organic Cotton and Wool.
                        </h2>
                        <div className={styles.grid2}>
                            <div>
                                <p className={styles.text}>
                                    At ЯДШ, we believe fashion and nature go hand-in-hand. That&apos;s why we source only organic cotton and materials, reducing our environmental footprint.
                                </p>
                                <span className={styles.detail}>(Sourced from Ireland)</span>
                            </div>
                            <div>
                                <p className={styles.text}>
                                    ЯДШ is committed to sustainable practices. From seed to stitch, we&apos;re minimizing our ecological footprint with 100% organic materials.
                                </p>
                                <span className={styles.detail}>(Pima Cotton)</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </main>
    );
}
