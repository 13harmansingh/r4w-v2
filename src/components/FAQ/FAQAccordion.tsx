'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItemProps[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <button
                        className={styles.trigger}
                        onClick={() => toggle(index)}
                    >
                        <span className={styles.question}>{item.question}</span>
                        <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
                    </button>
                    <div className={`${styles.content} ${openIndex === index ? styles.open : ''}`}>
                        <p className={styles.answer}>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
