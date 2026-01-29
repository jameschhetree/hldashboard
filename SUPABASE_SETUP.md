# Supabase Connection Setup

## Get Fresh Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/vbtftzghpcdhzzmkdros
2. Click **Settings** (gear icon) in the left sidebar
3. Click **Database** in the settings menu
4. Scroll down to **Connection string** section
5. Select **URI** tab (not "JDBC" or "Golang")
6. Copy the **entire connection string** - it should look like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.vbtftzghpcdhzzmkdros.supabase.co:5432/postgres
   ```

## Update .env File

1. Open `.env` file in BBEdit:
   ```bash
   open -a BBEdit .env
   ```

2. Replace the `DATABASE_URL` line with the connection string you copied from Supabase

3. **Important:** Make sure to replace `[YOUR-PASSWORD]` with your actual database password (the one you set when creating the Supabase project)

4. Save the file

## Try Migration Again

```bash
./node_modules/.bin/prisma migrate dev --name init
```

## Alternative: Use Connection Pooling

If direct connection doesn't work, try the **Connection Pooling** string from Supabase (port 6543 instead of 5432). This is more reliable for serverless environments.
