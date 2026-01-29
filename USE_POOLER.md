# Use Session Pooler Connection

## Why?
Your Supabase project shows "Not IPv4 compatible" for direct connections. Use Session Pooler instead.

## Steps:

1. In the "Connect to your project" modal:
   - Keep **Type:** "URI"
   - Keep **Source:** "Primary Database"  
   - Change **Method:** from "Direct connection" to **"Session Pooler"**

2. Copy the Session Pooler connection string (it will use port 6543 instead of 5432)

3. Update your `.env` file with this connection string

4. Run migration again:
   ```bash
   ./node_modules/.bin/prisma migrate dev --name init
   ```

## Alternative: Reset Password

If you're not sure about your database password:
1. Click "Database Settings" link in the modal
2. Reset your database password
3. Use the new password in your connection string
