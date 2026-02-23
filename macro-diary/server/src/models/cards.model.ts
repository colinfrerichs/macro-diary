import { supabaseAdmin } from "../config/supabase";

type Card = {
  id: string
  user_id: string
  meal_name: string
  carbs: number
  fat: number
  notes: string
  protein: number
  units: number
  created_at: string
}

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

export const addCardByUserId = async({ user_id, meal_name, carbs, fat, notes, protein, units }: Card) => {
    const {error, data} = await supabaseAdmin
        .from("cards")
        .insert({ user_id, meal_name, carbs, fat, notes, protein, units })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const deleteCard = async() => {}

export const updateCardById = async(card) => {}
