'use client';

import styles from "./page.module.css";
import Link from "next/link";
import Footer from '@/components/Footer/Footer';
import { useLocationTime } from '@/hooks/useLocationTime';

export default function HomePage() {
    const { city, currentTime } = useLocationTime();

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <video
                    className={styles.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/products/navy-tack-pant.jpg"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className={styles.heroOverlay} />

                {/* Centered Vertical Menu */}
                <div className={styles.menuContainer}>
                    {/* Logo */}
                    <h1 className={styles.logo}>ЯДШ.</h1>

                    {/* Vertical Links */}
                    <nav className={styles.verticalNav}>
                        <Link href="/shop" className={styles.navLink}>Shop</Link>
                        <Link href="/shop?filter=new" className={styles.navLink}>New Arrivals</Link>
                        <Link href="/brand" className={styles.navLink}>Brand</Link>
                        <Link href="/contact" className={styles.navLink}>Contact</Link>
                    </nav>
                </div>

                {/* Time Display - Bottom Center/Right approx */}
                <div className={styles.timeWrapper}>
                    {city}: {currentTime}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
