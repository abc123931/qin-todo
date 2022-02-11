import type { Session } from "@supabase/supabase-js";
import { proxy } from "valtio";

export const sessionState = proxy<{ session: Session | null }>({ session: null });
