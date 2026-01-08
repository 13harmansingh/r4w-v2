'use client';

import styles from './ShopFilters.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const filters = [
    { id: 'all', label: 'All' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'new', label: 'New' },
    { id: 'summer-2025', label: 'Summer 2025' },
];

export default function ShopFilters() {
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter') || 'all';

    return (
        <div className={styles.container}>
            {filters.map((filter) => (
                <Link
                    key={filter.id}
                    href={filter.id === 'all' ? '/shop' : `/shop?filter=${filter.id}`}
                    className={`${styles.filterLink} ${currentFilter === filter.id ? styles.active : ''}`}
                >
                    {filter.label}
                </Link>
            ))}
        </div>
    );
}
