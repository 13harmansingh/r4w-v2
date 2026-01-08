import Link from 'next/link';
import styles from './page.module.css';

// Mock data - will be replaced with database queries
const recentOrders = [
    { id: 'ORD-001', customer: 'john@example.com', total: 215, status: 'PROCESSING', date: '2025-12-13' },
    { id: 'ORD-002', customer: 'jane@example.com', total: 120, status: 'SHIPPED', date: '2025-12-12' },
    { id: 'ORD-003', customer: 'bob@example.com', total: 310, status: 'DELIVERED', date: '2025-12-11' },
];

const lowStockItems = [
    { name: 'Stone Hoodie - XL', stock: 0, sku: 'SH-XL-001' },
    { name: 'Stone Hoodie - XS', stock: 1, sku: 'SH-XS-001' },
    { name: 'Windbreaker - XL', stock: 1, sku: 'WB-XL-001' },
];

const stats = {
    totalOrders: 156,
    totalRevenue: 24580,
    pendingOrders: 12,
    lowStockItems: 5,
};

export default function AdminDashboard() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>ЯДШ Store Management</p>
                </div>

                {/* Quick Stats */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.totalOrders}</span>
                        <span className={styles.statLabel}>Total Orders</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>${stats.totalRevenue.toLocaleString()}</span>
                        <span className={styles.statLabel}>Total Revenue</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.pendingOrders}</span>
                        <span className={styles.statLabel}>Pending Orders</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={`${styles.statValue} ${styles.warning}`}>{stats.lowStockItems}</span>
                        <span className={styles.statLabel}>Low Stock Items</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.quickLinks}>
                    <Link href="/admin/orders" className={styles.quickLink}>
                        📦 Manage Orders
                    </Link>
                    <Link href="/admin/products" className={styles.quickLink}>
                        🏷️ Manage Products
                    </Link>
                    <Link href="/admin/inventory" className={styles.quickLink}>
                        📊 Inventory
                    </Link>
                    <Link href="/admin/customers" className={styles.quickLink}>
                        👥 Customers
                    </Link>
                </div>

                {/* Recent Orders */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Recent Orders</h2>
                        <Link href="/admin/orders" className={styles.viewAll}>View All →</Link>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.date}</td>
                                    <td>
                                        <Link href={`/admin/orders/${order.id}`} className={styles.actionBtn}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Low Stock Alert */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>⚠️ Low Stock Alert</h2>
                        <Link href="/admin/inventory" className={styles.viewAll}>View All →</Link>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockItems.map((item) => (
                                <tr key={item.sku}>
                                    <td>{item.name}</td>
                                    <td>{item.sku}</td>
                                    <td>
                                        <span className={item.stock === 0 ? styles.outOfStock : styles.lowStock}>
                                            {item.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={styles.actionBtn}>Update Stock</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
}
