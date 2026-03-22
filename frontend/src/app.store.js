import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/features/auth/auth.slice'
import chatReducer from '../src/features/chat/chat.slice'
const store=configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    }
})
export default store;