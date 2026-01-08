import styles from './page.module.css';
import Footer from '@/components/Footer/Footer';

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Contact</h1>
                </header>

                <div className={styles.content}>
                    {/* Left: Info */}
                    <div className={styles.infoCol}>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>(Location)</span>
                            <p className={styles.value}>
                                1456 Broadway<br />New York, NY 10018
                            </p>
                        </div>

                        <div className={styles.infoBlock}>
                            <span className={styles.label}>(Phone)</span>
                            <p className={styles.value}>949.245.8870</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <span className={styles.label}>(Customer Care)</span>
                            <p className={styles.value}>
                                <a href="mailto:support@r4w.com" className={styles.link}>support@r4w.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className={styles.formCol}>
                        <form className={styles.form}>
                            <div className={styles.field}>
                                <label htmlFor="name" className={styles.inputLabel}>Name</label>
                                <input type="text" id="name" className={styles.input} placeholder="Name" />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                                <input type="email" id="email" className={styles.input} placeholder="Email" />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="message" className={styles.inputLabel}>Message</label>
                                <textarea id="message" className={styles.textarea} placeholder="Message" rows={6}></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>JOIN</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
