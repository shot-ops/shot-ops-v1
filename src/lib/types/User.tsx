import { Database } from "../supabase/database.types";

export type Customer = Database["public"]["Tables"]["customer"]["Row"];
