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

type CardState = {
    cards: Card[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error?: string
}

const initialState: CardState = {
    cards: [],
    status: "idle",
    error: undefined,
}

const API_URL = "http://localhost:5000/api/cards"

// Helper functions
const updateStoreCards = (state, updatedCard) => {
    console.log('does this even hit')
    return state.cards.map((card) => {
        if (card.id === updatedCard.id) {
            return {
                ...updatedCard
            }
        }

        return card
    })
}

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

        return await response.json()
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

        return await response.json()
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

        return await response.json()
    }
)

export const updateCard = createAsyncThunk(
    "cards/updateCard",
    async(card: Card, thunkAPI) => {
        const token = localStorage.getItem("token")

        if (!token) throw new Error("No Auth token found.")

        const response = await fetch(`${API_URL}/${card.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(card)
        })

        if(!response.ok) {
            const errorData = await response.json()
            return thunkAPI.rejectWithValue(errorData.message ?? "Failed to update card.")
        }

        console.log('hello')
        const data = await response.json()
        console.log(data)

        return data
    }
)

export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getCards.pending, state => {
            state.status = "loading"
            state.error = undefined
        })
        .addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload
            state.status = "succeeded"
        })
        .addCase(getCards.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(addCard.pending, state => {
            state.status = "loading"
        })
        .addCase(addCard.fulfilled, (state, action) => {
            state.cards.push(action.payload)
            state.status = "succeeded"
        })
        .addCase(addCard.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(updateCard.pending, state => {
            state.status = "loading"
            state.error = undefined
        })
        .addCase(updateCard.fulfilled, (state, action) => {
            state.cards = updateStoreCards(state, action.payload)
            state.status = "succeeded"
        })
        .addCase(updateCard.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default cardSlice.reducer
