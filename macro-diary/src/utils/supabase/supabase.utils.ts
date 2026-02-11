import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export const signUpNewAuthUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({email, password})

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const signInAuthUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({email, password})

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const signOutAuthUser = async () => await supabase.auth.signOut()

export const createUserProfile = async (user: object) => {
    const { error: profileError } = await supabase.from("profiles").insert({
            id: user.id,
            username: email,
            created_at: user.created_at,
        })

    if (profileError) throw new Error(profileError.message)
}

export const onAuthStateChangedListener = (callback: (event: string, session: any) => void) => {
    const { data } = supabase.auth.onAuthStateChange(callback)

    return () => {
        data.subscription.unsubscribe()
    }
}
