import { createClient } from "@supabase/supabase-js";

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase Server-Konfiguration fehlt.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function requirePartyAdmin(secret?: string | null) {
  const configuredSecret = process.env.PARTY_ADMIN_SECRET;

  if (!configuredSecret) {
    throw new Error("PARTY_ADMIN_SECRET fehlt.");
  }

  if (!secret || secret !== configuredSecret) {
    throw new Error("Ungültiger Admin-Secret.");
  }
}

export { getServiceRoleClient };
