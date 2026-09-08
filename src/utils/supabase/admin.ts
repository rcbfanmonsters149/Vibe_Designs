import { createClient } from '@supabase/supabase-js'

// We use the service role key to bypass Row Level Security (RLS) for the automated agent
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase URL or Service Role Key in environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
