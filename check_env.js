const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const requiredKeys = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET'
];

console.log('--- Environment Variable Check ---');
let hasError = false;

requiredKeys.forEach(key => {
    const value = envConfig[key];
    if (!value) {
        console.error(`❌ Missing: ${key}`);
        hasError = true;
    } else if (value.includes('yourproject') || value.includes('sk_test_...')) { // Check for placeholder text
        console.warn(`⚠️  Placeholder detected: ${key} (Value: "${value}")`);
        hasError = true;
    } else {
        console.log(`✅ Present: ${key}`);
    }
});

if (hasError) {
    console.log('\nPlease update your .env file with real values.');
} else {
    console.log('\nAll required keys appear to be set.');
}
