import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

type UserSliceState = {
    currentUser: User | null
}

const initialState: UserSliceState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
