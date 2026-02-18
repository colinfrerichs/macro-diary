import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { User, Session } from "@supabase/supabase-js"

type UserSliceState = {
    currentUser: User | null
    session: Session | null
    loading: boolean
    error: string | null
}

type AuthPayload = {
    email: string
    password: string
}

type AuthResponse = {
    user: User | null
    session: Session | null
}

const initialState: UserSliceState = {
    currentUser: null,
    session: null,
    loading: false,
    error: null,
}

const API_URL = "http://localhost:5000/api"

export const signUserUp = createAsyncThunk<AuthResponse, AuthPayload, {rejectValue: string}> (
    "user/signUpUser",
    async({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const errorData = await response.json()
                return thunkAPI.rejectWithValue(errorData.message || "Failed to sign up.")
            }

            const data = await response.json()
            localStorage.setItem("token", data.token)

            return data
        } catch(err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }

            return thunkAPI.rejectWithValue("Unable to create new user.");
        }
    }
)

export const signUserIn = createAsyncThunk<AuthResponse, AuthPayload, {rejectValue: string}> (
    "users/signInUser",
    async({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            })

            if (!response.ok) {
                const errorData = await response.json()
                return thunkAPI.rejectWithValue(errorData.message || "Failed to sign in.")
            }

            const data = await response.json()
            localStorage.setItem("token", data.token)

            return data
        } catch(err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message)
            }

            return thunkAPI.rejectWithValue("Unable to sign user in.")
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null
            state.error = null
            state.session = null
            localStorage.removeItem("token")
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(signUserUp.fulfilled, (state, action) => {
            state.currentUser = action.payload.user
        })
        .addCase(signUserIn.fulfilled, (state, action) => {
            state.currentUser = action.payload.user
            state.session = action.payload.session
        })
    }
})

export const { logout, setCurrentUser } = userSlice.actions
export default userSlice.reducer
