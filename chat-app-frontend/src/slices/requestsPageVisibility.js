import { createSlice } from "@reduxjs/toolkit";


const visibilitySlice = createSlice({
    name:'visibility-slice',
    initialState : {
        visibility:"hidden"
    },
    reducers : {
        hide:(state) => {
            state.visibility = 'hidden'
        },
        show : (state) => {
            state.visibility = 'visible'
        }
    }
})

export const {hide,show} = visibilitySlice.actions;
export default visibilitySlice.reducer;

