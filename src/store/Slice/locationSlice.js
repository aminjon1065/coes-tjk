import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    latitude: "",
    longitude: ""
}

export const locationSlice = createSlice({
    name: "locationDevice",
    initialState,
    reducers: {
        locationSet: (state, action) => {
            state.latitude = action.payload?.latitude
            state.longitude = action.payload?.longitude
        }
    }
})

export const {locationSet} = locationSlice.actions;

export default locationSlice.reducer;