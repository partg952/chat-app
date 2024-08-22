import { createSlice } from "@reduxjs/toolkit";

let messageSlice = createSlice({
  name: "messages-slice",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      let newMessages = action.payload;
      state.messages = [...state.messages, newMessages];
    },
  },
});

export const { addMessages } = messageSlice.actions;
export default messageSlice.reducer;
