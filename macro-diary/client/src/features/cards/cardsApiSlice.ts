import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchUserCards } from "../../utils/supabase/supabase.utils";

type CardPayload = {
    userId: string
}

type Card = {
  id: string
  user_id: string
  meal_name: string
  protein: number
  carbs: number
  fat: number
  description?: string | null
  created_at: string
}

export const fetchCards = createAsyncThunk<Card[], CardPayload, {rejectValue: string}>(
    "cards/fetchCards",
    async({ userId }, thunkAPI) => {
        try {
            return await fetchUserCards(userId)
        } catch (err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message)
            }
        }

        return thunkAPI.rejectWithValue("An error occurred fetching cards. Please refresh page.")
    }
)

const initialState = {
    cards: [],
}

export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: () => {},
        removeCard: () => {},
        updateCard: () => {},
    },
    // extraReducers: builder => {
    //     builder
    // }
})
