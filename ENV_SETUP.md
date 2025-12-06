# Environment Variables Setup

## For Server Authentication to Work

Your `server/.env` file needs **TWO** Supabase keys:

```env
# Supabase Project URL
SUPABASE_URL=https://your-project.supabase.co

# For Authentication (Login API) - Use ANON KEY
SUPABASE_ANON_KEY=your_anon_key_here

# For Database Operations (Profile API) - Use SERVICE ROLE KEY
SUPABASE_KEY=your_service_role_key_here
```

## Why Two Keys?

1. **ANON KEY** (`SUPABASE_ANON_KEY`):
   - Used for user authentication (login)
   - Respects Row Level Security (RLS) policies
   - Safe to use for user-facing operations
   - **Use this for the Login API**

2. **SERVICE ROLE KEY** (`SUPABASE_KEY`):
   - Used for admin operations (database queries)
   - Bypasses RLS policies
   - **Use this for the Profile API** (updating profiles)

## Where to Find These Keys:

1. Go to your Supabase project dashboard
2. Click on **Settings** → **API**
3. You'll see:
   - **Project URL** → Use for `SUPABASE_URL`
   - **anon public** key → Use for `SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_KEY` (keep this secret!)

## Current Issue

If you're only using `SUPABASE_KEY` (service role key) for authentication, it might not work correctly because:
- Service role key bypasses authentication
- User login should use the anon key

## Fix Your .env File

Update `server/.env`:

```env
PORT=1962
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # anon key
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      # service_role key
```

Then restart your server!

