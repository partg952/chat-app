import { createSlice } from "@reduxjs/toolkit";

const socketIdSlice = createSlice({
    name:"socket-id-slice",
    initialState : {
        socketId:''
    },
    reducers : {
        addSocketId : (state,action) => {
            state.socketId = action.payload;
        }
    }
})

export const {addSocketId} = socketIdSlice.actions;
export default socketIdSlice.reducer;