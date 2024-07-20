/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const startingState = {};

const userSlice = createSlice({
    name:'user-slice',
    startingState,
    reducers : {
        addData:(state,action) => {
            state = action.payload;
        }
    }
});

export const {addData} = userSlice.actions;
export default userSlice.reducer;
