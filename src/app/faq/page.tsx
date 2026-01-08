import styles from './page.module.css';
import Footer from '@/components/Footer/Footer';
import FAQAccordion from '@/components/FAQ/FAQAccordion';

const faqData = [
    {
        category: 'Product',
        items: [
            { q: "What materials are used in your products?", a: "We use 100% organic cotton and ethically sourced wool sourced from Ireland. Our commitment to sustainability ensures high-quality, durable garments." },
            { q: "How do I care for my product?", a: "We recommend washing on a gentle cycle with cold water and laying flat to dry. Avoid bleach and high-heat drying to maintain the fabric's integrity." },
            { q: "Where are your products made?", a: "Our products are designed in New York and crafted in Portugal, ensuring fair labor practices and superior craftsmanship." }
        ]
    },
    {
        category: 'Shipping',
        items: [
            { q: "What shipping options do you offer?", a: "We offer Standard (3-5 business days) and Express (1-2 business days) shipping options at checkout." },
            { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by location." },
            { q: "Can I track my order?", a: "Absolutely. Once your order ships, you will receive a confirmation email with a tracking number." }
        ]
    },
    {
        category: 'Returns',
        items: [
            { q: "Can I return an item?", a: "Yes, we accept returns within 30 days of purchase for unworn items with original tags attached." },
            { q: "How do I initiate a return?", a: "Visit our Returns portal at the bottom of the page or contact support@r4w.com to start your return process." },
            { q: "Do I get a full refund?", a: "Yes, refunds are processed to your original payment method within 5-7 business days after we receive your return." }
        ]
    }
];

export default function FAQPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>FAQ&apos;s</h1>
                    <p className={styles.subtitle}>Frequently Asked Questions: Get the Answers You Need</p>
                    <p className={styles.contact}>
                        Still need help? Email us at: <a href="mailto:info@r4w.com">info@r4w.com</a>
                    </p>
                </header>

                <div className={styles.content}>
                    {faqData.map((section, idx) => (
                        <div key={idx} className={styles.section}>
                            <h2 className={styles.categoryTitle}>{section.category}</h2>
                            <FAQAccordion items={section.items.map(i => ({ question: i.q, answer: i.a }))} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
