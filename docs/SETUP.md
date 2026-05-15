# Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Fill Supabase and AI keys in `.env.local` before using auth, database, transcription, or AI extraction.

## Supabase

1. Create a Supabase project.
2. Apply `supabase/migrations/0001_initial_schema.sql` in the SQL editor.
3. Enable Email + Password auth.
4. Add redirect URLs for local and cloud IDE origins.

## Vercel

Import the repository, set environment variables, and deploy with the default Next.js preset.
