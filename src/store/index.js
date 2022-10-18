import {configureStore} from "@reduxjs/toolkit";
import SignInSlice from "./Slice/signInSlice";
import locationSlice from "./Slice/locationSlice";


export const rootReducer = {
    signIn: SignInSlice,
    locationDevice: locationSlice
}


export const store = configureStore({
    reducer: rootReducer
});