import { createClient } from '@supabase/supabase-js';

// Ambil Key Public
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Safety check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL atau Anon Key belum di-set di .env.local");
}

// Export Client (Aman untuk Browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);