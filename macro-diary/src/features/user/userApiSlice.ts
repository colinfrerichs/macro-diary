import { createSlice } from "@reduxjs/toolkit";
import { CounterSliceState } from "../counter/counterSlice";

type UserSliceState = {
    currentUser: object
    status: "idle" | "loading" | "failed"
}

const initialState: UserSliceState = {
    currentUser: {},
    status: "idle",
}

export const userApiSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
})
