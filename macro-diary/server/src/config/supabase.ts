import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase env variables.")
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey)
