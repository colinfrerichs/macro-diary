import { supabaseAdmin } from "../config/supabase";

export const findCardsByUserId = async({ user_id }: { user_id: number }) => {
    const { data, error } = await supabaseAdmin
    .from("cards")
    .select("*")
    .eq("user_id", user_id)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const addCard = async() => {}

export const deleteCard = async() => {}

export const updateCard = async() => {}
