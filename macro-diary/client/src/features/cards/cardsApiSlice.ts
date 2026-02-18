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

const initialState = {
    cards: [],
    selectedCard: null,
    isModalOpen: false,
}

const API_URL = "http://localhost:5000/api/cards"

export const addCard = createAsyncThunk(
    "cards/addCard",
    async (card: Card, thunkAPI) => {
        const token = localStorage.getItem("token")

        if (!token) throw new Error("No Auth token found.")

        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(card)
        })

        if (!response.ok) {
            const errorData = await response.json()
            return thunkAPI.rejectWithValue(errorData.message ?? "Failed to add card.")
        }

        const data = await response.json()
        return data
    }
)

export const deleteCard = createAsyncThunk(
    "cards/deleteCard",
    async (card: Card, thunkAPI) => {
        const token = localStorage.getItem("token")

        if (!token) throw new Error("No Auth token found.")
        
        const response = await fetch(`${API_URL}/${card.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            return thunkAPI.rejectWithValue(errorData.message ?? "Failed to delete card.")
        }

        const data = await response.json()
        return data
    }
)

export const getCards = createAsyncThunk(
    "cards/fetchCards",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token")

        if (!token) throw new Error("No Auth token found.")

        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return thunkAPI.rejectWithValue(errorData.message ?? "Failed to pull cards.")
        }

        const data = await response.json()
        return data
    }
)

export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.selectedCard = action.payload || null
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.selectedCard = null
            state.isModalOpen = false
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload
        })
    }
})

export const { openModal, closeModal } = cardSlice.actions
export default cardSlice.reducer
