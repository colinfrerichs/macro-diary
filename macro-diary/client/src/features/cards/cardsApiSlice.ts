import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

async function getCards(): Promise<Card[]> {
    const response = await fetch("http://localhost:5000/api/cards")

    if (!response.ok) throw new Error("Failed to fetch cards")

    return response.json() as Promise<Card[]>
}

export const fetchCards = createAsyncThunk<Card[], CardPayload, {rejectValue: string}>(
    "cards/fetchCards",
    async () => {
        return await getCards()
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
