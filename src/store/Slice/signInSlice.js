import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authentificated: false,
    user: {},
    message: "",
    isAdmin: false
}

export const signInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        signed: (state, action) => {
            state.authentificated = true
            state.user = action.payload?.data
            state.message = action.payload.message
            state.isAdmin = action.payload.isAdmin
        },
        signedError: (state) => {
            state.authentificated = false
            state.user = {}
        },
        logOut: (state) => {
            state.authentificated = false
            state.user = {}
        },
        isAuth: (state, action) => {
            state.authentificated = true
            state.user = action.payload
        }
    }
})

export const {signed, signedError, logOut, isAuth} = signInSlice.actions

export default signInSlice.reducer