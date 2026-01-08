
async function testCheckout() {
    try {
        const response = await fetch('http://localhost:3000/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        productId: 'test_123',
                        variantId: 'var_123',
                        name: 'Test Product',
                        price: 2000, // $20.00
                        quantity: 1,
                        size: 'M'
                    }
                ],
                email: 'test@example.com'
            }),
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testCheckout();
