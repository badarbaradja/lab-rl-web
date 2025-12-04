import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Safety check khusus server
if (!supabaseServiceKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY tidak ditemukan. Cek .env.local");
}

// Export Admin Client (Hanya untuk API Route, JANGAN import di page.tsx biasa)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});