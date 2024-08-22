import { createSlice } from "@reduxjs/toolkit";


const activeChat = createSlice({
    name:'active-chat',
    initialState : {
        chatDetails:{}
    },
    reducers : {
        setCurrentChat : (state,action) => {
            state.chatDetails = action.payload
        }

    }
})
export const {setCurrentChat} = activeChat.actions;
export default activeChat.reducer;

