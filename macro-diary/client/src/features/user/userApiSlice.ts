import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { User, Session } from "@supabase/supabase-js"

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

//  

// export const signUserOut = createAsyncThunk(
//     "user/signOutUser",
//     async (_, thunkAPI) => {
//         try {
//             await signOutAuthUser()
//         } catch (err: unknown) {
//             if (err instanceof Error) {
//                 return thunkAPI.rejectWithValue(err.message)
//             }

//             return thunkAPI.rejectWithValue("Unable to log user out.")
//         }
//     }
// )

export const signUserUp = createAsyncThunk<AuthResponse, AuthPayload, {rejectValue: string}>(
    "user/signUpUser",
    async({ email, password }, thunkAPI) => {
        console.log("hit")
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message || "Failed to sign up")
            }

            const data = await response.json()
            return data
        } catch(err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }

            return thunkAPI.rejectWithValue("Unable to create new user.");
        }
    }
)

// export const createNewUserProfile = createAsyncThunk(
//     "user/createProfile",
//     async(user: User, thunkAPI) => {
//         try {
//             await createUserProfile(user)
//         } catch(err: unknown) {
//             if (err instanceof Error) {
//                 return thunkAPI.rejectWithValue(err.message)
//             }

//             return thunkAPI.rejectWithValue("Unable to create user profile.")
//         }
//     }
// )

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        }
    }
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
