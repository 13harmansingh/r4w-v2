'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <button onClick={handleSignOut} className={styles.signOutBtn}>
            Sign Out
        </button>
    );
}
