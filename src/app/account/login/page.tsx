'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const supabase = createClient();
            if (!supabase) {
                setError('Supabase connection error. Please try again later.');
                return;
            }
            const { error: signInError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (signInError) {
                setError(signInError.message || 'Something went wrong. Please try again.');
            } else {
                setIsSent(true);
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Check Your Email</h1>
                        <p className={styles.text}>
                            We&apos;ve sent a magic link to <strong>{email}</strong>.
                            Click the link in the email to sign in.
                        </p>
                        <p className={styles.subtext}>
                            Didn&apos;t receive it? Check your spam folder or{' '}
                            <button
                                onClick={() => setIsSent(false)}
                                className={styles.linkBtn}
                            >
                                try again
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sign In</h1>
                    <p className={styles.text}>
                        Enter your email and we&apos;ll send you a magic link to sign in.
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={styles.input}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Magic Link'}
                        </button>
                    </form>

                    <p className={styles.footer}>
                        By signing in, you agree to our{' '}
                        <Link href="/privacy">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
