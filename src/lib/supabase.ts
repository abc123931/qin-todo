import { SUPABASE_ANON_KEY, SUPABASE_API_URL } from "@env";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);