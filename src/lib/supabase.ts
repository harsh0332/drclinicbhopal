import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl && typeof window === "undefined") {
  console.warn("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseServiceKey && typeof window === "undefined") {
  console.warn("Missing env var: SUPABASE_SERVICE_ROLE_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
