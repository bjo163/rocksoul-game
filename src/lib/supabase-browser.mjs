import { createClient } from "@supabase/supabase-js";

/**
 * Optional browser-only game account client. No server privileges or secret keys.
 * Missing Vercel environment variables disable accounts; the M1 demo still works.
 */
export function isGameAuthConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  try { return new URL(url).protocol === "https:" && key.length > 12; }
  catch { return false; }
}
let browserClient = null;
export function getGameAuthClient() {
  if (!isGameAuthConfigured()) return null;
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      },
    );
  }
  return browserClient;
}
