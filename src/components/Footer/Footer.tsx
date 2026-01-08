import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerCol}>
                        <span className={styles.footerLabel}>(Customer Care)</span>
                        <div className={styles.footerLinks}>
                            <Link href="/account">Account</Link>
                            <Link href="/contact">Our Store</Link>
                            <Link href="/faq">FAQ</Link>
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <span className={styles.footerLabel}>(Navigate)</span>
                        <div className={styles.footerLinks}>
                            <Link href="/shop">Shop</Link>
                            <Link href="/brand">Brand</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <span className={styles.footerLabel}>(Other)</span>
                        <div className={styles.footerLinks}>
                            <Link href="/privacy">Privacy</Link>
                            <Link href="/404">404</Link>
                        </div>
                    </div>

                    <div className={styles.footerColNewsletter}>
                        <span className={styles.footerLabel}>(Newsletter)</span>
                        <p className={styles.newsletterText}>Subscribe to our newsletter</p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.newsletterBtn}>JOIN</button>
                        </form>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.bottomBrand}>ЯДШ.</div>
                    <div className={styles.bottomRight}>
                        <span>By ЯДШ Studio</span>
                        <span>©2025</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
