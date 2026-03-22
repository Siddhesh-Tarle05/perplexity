import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        loading: false,
        currentChatId: null,
        error: null,
        messages: []
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title: title,
                messages: [],
                lastUpdated: new Date().toISOString()
            }
        },
        setNewMessages: (state, action) => {
            const { chatId, message, role } = action.payload
            if (state.chats[chatId]) {
                state.chats[chatId].messages.push({ content: message, role })
                state.chats[chatId].lastUpdated = new Date().toISOString()
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})
export const { setLoading, setCurrentChatId, setChats, setError, createNewChat, setNewMessages } = chatSlice.actions
export default chatSlice.reducer