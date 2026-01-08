'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Mock orders data - will be replaced with database queries
const initialOrders = [
    {
        id: 'ORD-001',
        customer: 'john@example.com',
        items: [{ name: 'Navy Tack Pant', size: 'M', qty: 1 }],
        total: 120,
        status: 'PROCESSING',
        trackingNumber: '',
        date: '2025-12-13',
        address: '123 Main St, New York, NY 10001'
    },
    {
        id: 'ORD-002',
        customer: 'jane@example.com',
        items: [{ name: 'Pink Hoodie', size: 'S', qty: 1 }, { name: 'Grey Shorts', size: 'M', qty: 2 }],
        total: 225,
        status: 'PENDING',
        trackingNumber: '',
        date: '2025-12-12',
        address: '456 Oak Ave, Los Angeles, CA 90001'
    },
    {
        id: 'ORD-003',
        customer: 'bob@example.com',
        items: [{ name: 'Windbreaker', size: 'L', qty: 1 }],
        total: 145,
        status: 'SHIPPED',
        trackingNumber: '1Z999AA10123456784',
        date: '2025-12-11',
        address: '789 Pine Rd, Chicago, IL 60601'
    },
];

const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [trackingInput, setTrackingInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const updateTrackingNumber = (orderId: string) => {
        setOrders(orders.map(order =>
            order.id === orderId
                ? { ...order, trackingNumber: trackingInput, status: 'SHIPPED' }
                : order
        ));
        setEditingId(null);
        setTrackingInput('');
    };

    const filteredOrders = statusFilter === 'ALL'
        ? orders
        : orders.filter(o => o.status === statusFilter);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <Link href="/admin" className={styles.backLink}>← Back to Dashboard</Link>
                        <h1 className={styles.title}>Orders Management</h1>
                    </div>
                    <div className={styles.filters}>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={styles.select}
                        >
                            <option value="ALL">All Orders</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.ordersList}>
                    {filteredOrders.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <div>
                                    <span className={styles.orderId}>{order.id}</span>
                                    <span className={styles.orderDate}>{order.date}</span>
                                </div>
                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className={styles.orderDetails}>
                                <div className={styles.detailSection}>
                                    <h4>Customer</h4>
                                    <p>{order.customer}</p>
                                    <p className={styles.address}>{order.address}</p>
                                </div>

                                <div className={styles.detailSection}>
                                    <h4>Items</h4>
                                    {order.items.map((item, idx) => (
                                        <p key={idx}>{item.name} - Size {item.size} × {item.qty}</p>
                                    ))}
                                </div>

                                <div className={styles.detailSection}>
                                    <h4>Total</h4>
                                    <p className={styles.total}>${order.total}</p>
                                </div>
                            </div>

                            <div className={styles.orderActions}>
                                {/* Status Selector */}
                                <div className={styles.actionGroup}>
                                    <label>Update Status:</label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        className={styles.select}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tracking Number */}
                                <div className={styles.actionGroup}>
                                    <label>Tracking Number:</label>
                                    {editingId === order.id ? (
                                        <div className={styles.trackingInput}>
                                            <input
                                                type="text"
                                                value={trackingInput}
                                                onChange={(e) => setTrackingInput(e.target.value)}
                                                placeholder="Enter tracking number"
                                                className={styles.input}
                                            />
                                            <button
                                                onClick={() => updateTrackingNumber(order.id)}
                                                className={styles.saveBtn}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className={styles.cancelBtn}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.trackingDisplay}>
                                            {order.trackingNumber ? (
                                                <span>{order.trackingNumber}</span>
                                            ) : (
                                                <span className={styles.noTracking}>Not added</span>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setEditingId(order.id);
                                                    setTrackingInput(order.trackingNumber);
                                                }}
                                                className={styles.editBtn}
                                            >
                                                {order.trackingNumber ? 'Edit' : 'Add'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
