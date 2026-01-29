#!/bin/bash

# Test database connection
echo "Testing database connection..."
echo ""

# Try to connect using psql if available
if command -v psql &> /dev/null; then
    echo "Attempting connection with psql..."
    psql "postgresql://postgres:5CV%24ZXjZ8i_f8E%23@db.vbtftzghpcdhzzmkdros.supabase.co:5432/postgres" -c "SELECT version();" 2>&1
else
    echo "psql not installed. Checking Supabase project status..."
    echo ""
    echo "Please check:"
    echo "1. Go to https://supabase.com/dashboard"
    echo "2. Open your project"
    echo "3. Check if it says 'Paused' - if so, click 'Resume'"
    echo "4. Go to Settings → Database"
    echo "5. Copy the connection string from 'URI' format"
    echo ""
fi
