'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    // Assume all non-home pages should be light mode (black text) for now
    const isLightMode = !isHomePage;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Time logic
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: 'Europe/Lisbon', // Hardcoded fallback or use logic
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setCurrentTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Scroll logic
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cart Logic
    const { items, openCart } = useCart();

    // Context Logic
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const sup = createClient();
        if (!sup) return;

        const getUser = async () => {
            const { data: { user } } = await sup.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = sup.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isHomePage) return null;

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isLightMode ? styles.lightMode : ''}`}>
            {/* Left: Logo */}
            <Link href="/" className={styles.logo}>
                ЯДШ
            </Link>

            {/* Center: Navigation */}
            <nav className={styles.nav}>
                <Link href="/shop" className={styles.navLink}>
                    <span className={styles.navText}>Shop</span>
                </Link>
                <Link href="/shop?filter=new" className={styles.navLink}>
                    <span className={styles.navText}>New Arrivals</span>
                </Link>
                <Link href="/brand" className={styles.navLink}>
                    <span className={styles.navText}>Brand</span>
                </Link>
                <Link href="/contact" className={styles.navLink}>
                    <span className={styles.navText}>Contact</span>
                </Link>
            </nav>

            {/* Right: Time & Cart */}
            <div className={styles.right}>
                <span className={styles.time}>LISBON: {currentTime}</span>

                <Link href={user ? "/account" : "/account/login"} className={styles.navLink} style={{ marginRight: '20px' }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        {user ? 'Account' : 'Login'}
                    </span>
                </Link>

                <button
                    className={styles.cartBtn} // You might need to add this class to CSS or reuse .cart style
                    onClick={openCart}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: 'inherit',
                        padding: 0
                    }}
                >
                    Cart({items.length})
                </button>
            </div>

            {/* Mobile Menu */}
            <button
                className={styles.menuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
            >
                <div className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Mobile Nav Overlay */}
            <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                <Link href="/shop?filter=new" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
                <Link href="/brand" onClick={() => setIsMenuOpen(false)}>Brand</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link href={user ? "/account" : "/account/login"} onClick={() => setIsMenuOpen(false)}>
                    {user ? 'Account' : 'Login'}
                </Link>
            </div>
        </header>
    );
}
