import {configureStore} from "@reduxjs/toolkit";
import SignInSlice from "./Slice/signInSlice";


export const rootReducer = {
    signIn: SignInSlice,
}


export const store = configureStore({
    reducer: rootReducer
});