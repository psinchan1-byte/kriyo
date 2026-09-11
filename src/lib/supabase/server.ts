// For future server-side privileged access if needed.
// E.g. using a Service Role Key (never expose to client)
import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // If you ever need admin privileges, use a separate service role key env var here.
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseKey);
}
