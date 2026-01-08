import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';
import styles from './page.module.css';
import Link from 'next/link';
import SignOutButton from './SignOutButton';

export default async function AccountPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/account/login');
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            items: true,
        },
    });

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>My Account</h1>
                    <SignOutButton />
                </header>

                <div className={styles.grid}>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Profile</h2>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>{user.email}</span>
                        </div>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Order History</h2>
                        {orders.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You haven&apos;t placed any orders yet.</p>
                                <Link href="/shop" className={styles.shopLink}>
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <table className={styles.orderList}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className={styles.orderId}>#{order.orderNumber.slice(-6)}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>${Number(order.total).toFixed(2)}</td>
                                            <td>{order.items.length} items</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
