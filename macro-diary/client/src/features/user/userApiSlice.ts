import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { User, Session } from "@supabase/supabase-js"

import {
  createUserProfile,
  signInAuthUser,
  signOutAuthUser,
  signUpNewAuthUser,
} from "../../utils/supabase/supabase.utils"

type UserSliceState = {
    currentUser: User | null
    session: Session | null
    loading: boolean
    error: string | null | object
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

export const signUserIn = createAsyncThunk<AuthResponse, AuthPayload, {rejectValue: string}>(
    "user/signInUser",
    async({ email, password }, thunkAPI) => {
        try {
            return await signInAuthUser(email, password)
        } catch (err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message)
            }

            return thunkAPI.rejectWithValue("Unable to log user in.")
        }
    }
)

export const signUserOut = createAsyncThunk(
    "user/signOutUser",
    async (_, thunkAPI) => {
        try {
            await signOutAuthUser()
        } catch (err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message)
            }

            return thunkAPI.rejectWithValue("Unable to log user out.")
        }
    }
)

export const signUserUp = createAsyncThunk<AuthResponse, AuthPayload, {rejectValue: string}>(
    "user/signUpUser",
    async({ email, password }, thunkAPI) => {
        try {
            return await signUpNewAuthUser(email, password)
        } catch(err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }

            return thunkAPI.rejectWithValue("Unable to create new user.");
        }
    }
)

export const createNewUserProfile = createAsyncThunk(
    "user/createProfile",
    async(user: User, thunkAPI) => {
        try {
            await createUserProfile(user)
        } catch(err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message)
            }

            return thunkAPI.rejectWithValue("Unable to create user profile.")
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signUserIn.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(signUserIn.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload.user
                state.session = action.payload.session
            })
            .addCase(signUserIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Sign in failed."
            })
            .addCase(signUserOut.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(signUserOut.fulfilled, state => {
                state.loading = false
                state.currentUser = null
                state.session = null
            })
            .addCase(signUserOut.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Sign out failed."
            })
            .addCase(signUserUp.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(signUserUp.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload.user
                state.session = action.payload.session
            })
            .addCase(signUserUp.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Failed to sign user up."
            })
    }
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
