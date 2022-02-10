import { SUPABASE_ANON_KEY, SUPABASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false,
});
