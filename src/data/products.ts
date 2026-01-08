export interface Product {
    id: string; // Changed to string for Prisma/Stripe compatibility
    title: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    isNew: boolean;
    colors: string[];
    sizes: string[];
    variantId?: string; // Optional for now
}

export const products: Product[] = [
    {
        id: '1',
        title: 'Navy Tack Pant',
        slug: 'navy-tack-pant',
        price: 79.00,
        description: 'The Navy Tack Pant features a relaxed fit with a tapered leg. Constructed from a durable cotton blend, these pants are designed for everyday wear. Includes deep pockets and a secure button fastening.',
        images: [
            '/images/products/navy-tack-pant-1.jpg',
            '/images/products/navy-tack-pant-2.jpg',
            '/images/products/navy-tack-pant-3.jpg',
            '/images/products/navy-tack-pant-4.jpg'
        ],
        isNew: false,
        colors: ['Navy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        variantId: 'v1'
    },
    {
        id: '2',
        title: 'Pink Hoodie',
        slug: 'pink-hoodie',
        price: 90.00,
        description: 'A premium heavyweight hoodie in a soft pink hue. Features a double-lined hood, ribbed cuffs, and a kangaroo pocket. Perfect for layering in cooler weather.',
        images: [
            '/images/products/pink-hoodie-1.jpg',
            '/images/products/pink-hoodie-2.jpg',
            '/images/products/pink-hoodie-3.jpg'
        ],
        isNew: true,
        colors: ['Pink'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        variantId: 'v2'
    },
    {
        id: '3',
        title: 'Black Sweatshirt',
        slug: 'black-sweatshirt',
        price: 70.00,
        description: 'The essential Black Sweatshirt. Made from 100% organic cotton loopback fleece. Clean lines, a comfortable fit, and our signature minimal branding.',
        images: [
            '/images/products/black-sweatshirt-1.jpg',
            '/images/products/black-sweatshirt-2.jpg',
            '/images/products/black-sweatshirt-3.jpg',
            '/images/products/black-sweatshirt-4.jpg'
        ],
        isNew: false,
        colors: ['Black'],
        sizes: ['S', 'M', 'L', 'XL'],
        variantId: 'v3'
    },
    {
        id: '4',
        title: 'Grey Shorts',
        slug: 'grey-shorts',
        price: 45.00,
        description: 'Comfortable grey lounge shorts perfect for relaxing or light exercise. Features an elasticated waistband with drawstring and side pockets.',
        images: [
            '/images/products/grey-shorts-1.jpg',
            '/images/products/grey-shorts-2.jpg',
            '/images/products/grey-shorts-3.jpg'
        ],
        isNew: true,
        colors: ['Grey'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        variantId: 'v4'
    },
    {
        id: '5',
        title: 'Stone Hoodie',
        slug: 'stone-hoodie',
        price: 90.00,
        description: 'Our signature hoodie in a versatile Stone colorway. Heavyweight cotton fleece ensures warmth and durability. A wardrobe staple that gets better with age.',
        images: [
            '/images/products/stone-hoodie-1.jpg',
            '/images/products/stone-hoodie-2.jpg',
            '/images/products/stone-hoodie-3.jpg',
            '/images/products/stone-hoodie-4.jpg'
        ],
        isNew: false,
        colors: ['Stone'],
        sizes: ['S', 'M', 'L', 'XL'],
        variantId: 'v5'
    },
    {
        id: '6',
        title: 'Neon Track Pant',
        slug: 'neon-track-pant',
        price: 85.00,
        description: 'Stand out with the Neon Track Pant. Technical fabric construction with a vibrant neon accent. Features zipped ankles and a water-resistant finish.',
        images: [
            '/images/products/neon-track-pant-1.jpg',
            '/images/products/neon-track-pant-2.jpg',
            '/images/products/neon-track-pant-3.jpg',
            '/images/products/neon-track-pant-4.jpg'
        ],
        isNew: true,
        colors: ['Neon'],
        sizes: ['S', 'M', 'L'],
        variantId: 'v6'
    },
    {
        id: '7',
        title: 'Windbreaker',
        slug: 'windbreaker',
        price: 110.00,
        description: 'A lightweight, packable windbreaker designed for unpredictable weather. Features a hidden hood, adjustable hem, and breathable mesh lining.',
        images: [
            '/images/products/windbreaker-1.jpg',
            '/images/products/windbreaker-2.jpg',
            '/images/products/windbreaker-3.jpg',
            '/images/products/windbreaker-4.jpg'
        ],
        isNew: false,
        colors: ['White', 'Black'],
        sizes: ['S', 'M', 'L', 'XL'],
        variantId: 'v7'
    },
    {
        id: '8',
        title: 'Green Tee',
        slug: 'green-tee',
        price: 40.00,
        description: 'Classic crew neck t-shirt in a rich forest green. 100% cotton jersey for a soft, breathable feel. Pre-shrunk to maintain fit wash after wash.',
        images: [
            '/images/products/green-tee-1.jpg',
            '/images/products/green-tee-2.jpg',
            '/images/products/green-tee-3.jpg',
            '/images/products/green-tee-4.jpg'
        ],
        isNew: false,
        colors: ['Green'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        variantId: 'v8'
    },
    {
        id: '9',
        title: 'Blue Shorts',
        slug: 'blue-shorts',
        price: 45.00,
        description: 'Vibrant blue shorts with a retro athletic cut. Quick-dry fabric makes them suitable for swimwear or casual summer wear.',
        images: [
            '/images/products/blue-shorts-1.jpg',
            '/images/products/blue-shorts-2.jpg',
            '/images/products/blue-shorts-3.jpg',
            '/images/products/blue-shorts-4.jpg'
        ],
        isNew: false,
        colors: ['Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        variantId: 'v9'
    }
];
