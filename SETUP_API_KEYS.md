# Environment Variables Setup

To get the application running with all features, you need to create a `.env` file in the root directory and add the following keys.

## Supabase (Database & Auth)
Get these from your [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API:

- `NEXT_PUBLIC_SUPABASE_URL`: Your project's URL (e.g., `https://yourproject.supabase.co`).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public `anon` key for client-side operations.
- `SUPABASE_SERVICE_ROLE_KEY`: (Optional, for admin API calls) The secret `service_role` key. **Keep this private!**
- `DATABASE_URL`: Your PostgreSQL connection string. Get this from Project Settings → Database → Connection String (use "URI" or "Transaction Pooler" for serverless).

## Stripe Settings
Get these from your [Stripe Dashboard](https://dashboard.stripe.com/apikeys) → Developers → API keys:

- `STRIPE_SECRET_KEY`: Your secret key (starts with `sk_test_` or `sk_live_`).
- `STRIPE_WEBHOOK_SECRET`: Get this by running the Stripe CLI (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`) or from the Webhooks dashboard in production.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (Optional for now) The publishable key if you use Stripe Elements on the client side.

## Email (Optional)
- `RESEND_API_KEY`: If you want to enable order confirmation emails. Get this from [Resend](https://resend.com).

---

### Example `.env` content:
```env
# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL="https://yourproject.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIU..."
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Optional)
RESEND_API_KEY=re_...
```
