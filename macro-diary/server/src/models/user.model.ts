import { supabaseAdmin } from "../config/supabase"

export const createUser = async ({email, password}: { email: string, password: string}) => {
    const { data, error } = await supabaseAdmin
    .from("users")
    .insert([
        { email, password }
    ])
    .select()
    .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const findUserByEmail = async (email: string) => {
    const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}
