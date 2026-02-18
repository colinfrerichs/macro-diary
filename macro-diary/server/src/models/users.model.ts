import { supabaseAdmin } from "../config/supabase"

export const createUser = async ({email, hashedPassword}: { email: string, hashedPassword: string}) => {
    const { data, error } = await supabaseAdmin
    .from("users")
    .insert([
        { email, hashed_password: hashedPassword }
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
    .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return data
}
