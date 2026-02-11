import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export const createNewUserWithUsernameAndPassword= async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({email, password})

    if (error) {
        throw new Error(error.message)
    }

    if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            username: email,
            created_at: data.user.created_at,
        })

        if (profileError) throw new Error(profileError.message)
    }

    return data
}
