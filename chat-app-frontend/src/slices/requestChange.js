import { createSlice } from "@reduxjs/toolkit";


const requestUpdated = createSlice({
    name:"requests-updated",
    initialState : {
        value:true
    },
    reducers : {
        change : (state) => {
            state.value ? state.value = false : state.value = true
        }
    }
});

export const {change} = requestUpdated.actions;
export default requestUpdated.reducer;
