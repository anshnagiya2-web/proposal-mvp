import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client, created lazily on first use.
 *
 * This is deliberately NOT created at module load time: Next.js imports
 * this module during the server-side prerender pass for every page that
 * (transitively) imports lib/storage.ts, and createClient() throws
 * immediately if the URL/key aren't set. Creating it lazily means a build
 * without the env vars configured still succeeds — the clear error below
 * only surfaces when a proposal is actually saved or loaded.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase isn't configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  client = createClient(url, key);
  return client;
}

export const PROPOSALS_TABLE = "proposals";
export const PROPOSAL_MEDIA_BUCKET = "proposal-media";
