import { createClient } from "@supabase/supabase-js"
import type { User } from "@supabase/supabase-js"
import type { AuthChangeEvent, Session } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export type Card = {
    id: string
    user_id: string
    meal_name: string
    protein: number
    carbs: number
    fat: number
    description?: string | null
    created_at: string
}

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

export const createUserProfile = async (user: User) => {
    const { error: profileError } = await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            created_at: user.created_at,
        })

    if (profileError) throw new Error(profileError.message)
}

export const fetchUserCards = async (userId: string) => {
    const { data, error }: { data: Card[] | null, error: unknown} = await supabase.from("cards").select("*").eq("user_id", userId)

    if (error) {
        if (error instanceof Error) throw new Error(error.message)
    }

    return data ?? []
}

export const insertNewCard = async(card: Card) => {}

export const updateCard = async(card: Card) => {}

export const deleteCard = async(card: Card) => {}

export const onAuthStateChangedListener = (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
    const { data } = supabase.auth.onAuthStateChange(callback)

    return () => {
        data.subscription.unsubscribe()
    }
}
