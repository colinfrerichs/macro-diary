import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { User, Session } from "@supabase/supabase-js"

import {
  createUserProfile,
  signOutAuthUser,
  signUpNewAuthUser,
} from "../../utils/supabase/supabase.utils"

type UserSliceState = {
    currentUser: User | null
}

type SignUpPayload = {
    username: string
    password: string
}

type SignUpResponse = {
    user: User | null
    session: Session | null
}

const initialState: UserSliceState = {
    currentUser: null,
}

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

export const signUserUp = createAsyncThunk<SignUpResponse, SignUpPayload, {rejectValue: string}>(
    "user/signUpUser",
    async({ username, password }, thunkAPI) => {
        try {
            return await signUpNewAuthUser(username, password)
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
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
