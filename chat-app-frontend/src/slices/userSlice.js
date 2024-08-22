/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const startingState = {
    userDetails:null
};

const userSlice = createSlice({
    name:'user-slice',
    initialState:startingState,
    reducers : {
        addData:(state,action) => {
            state.userDetails = action.payload;
        }
    }
});

export const {addData} = userSlice.actions;
export default userSlice.reducer;
