import { createSlice } from "@reduxjs/toolkit";

let messageSlice = createSlice({
  name: "messages-slice",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      let newMessages = action.payload;
      state.messages = state.messages.concat(newMessages) 
    },
    resetChats:(state) => {
      state.messages = [];
    }
  },
});

export const { addMessages,resetChats } = messageSlice.actions;
export default messageSlice.reducer;
