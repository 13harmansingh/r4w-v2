import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import Header from "@/components/Header/Header";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
    title: "ЯДШ | Premium Clothing",
    description: "High-end conceptual fashion store.",
};

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body>
                <CartProvider>
                    <SmoothScroll />
                    <Header />
                    <CartDrawer />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
