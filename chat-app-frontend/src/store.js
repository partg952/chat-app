import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import visibility from  './slices/requestsPageVisibility';
import requestChange from './slices/requestChange';
import messages from './slices/messagesSlice';
import activeChat from './slices/activeChat';
import socketId from './slices/socketId';
const store = configureStore({
    reducer:{
        user:userReducer,
        requestsPageVisibility:visibility,
        messages:messages,
        activeChat:activeChat,
        socketId:socketId,
        requestsUpdated : requestChange
    }
});

export default store;