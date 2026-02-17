import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getCards = createAsyncThunk(
    "cards/fetchCards",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token")

        if (!token) throw new Error("No Auth token found.")

        const response = await fetch("http://localhost:5000/api/user/cards", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return thunkAPI.rejectWithValue(errorData.message || "Failed to pull cards.")
        }

        const data = await response.json()

        return data
    }
)

const initialState = {
    cards: [],
    selectedCard: null,
    isModalOpen: false,
}

export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload
        })
    }
})

export default cardSlice.reducer
