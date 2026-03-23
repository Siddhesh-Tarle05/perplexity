import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
    name: 'chatSlice',
    initialState: {
        messages: [],
        title: null,
        chatId: null,
        AllChats:[],
        isImage:false
    },
    reducers: {
        setMessage: (state, action) => {
            let message=action.payload
            state.messages.push(message)   
        },
        setAllMessage:(state,action)=>{
            state.messages=action.payload
        },
        setChatId: (state, action) => {
            state.chatId=action.payload
        },
        setTitle:(state,action)=>{
            state.title=action.payload
        },
        setAllChats:(state,action)=>{
            state.AllChats=action.payload
        },
        setisImage:(state,action)=>{
            state.isImage=action.payload
        }
    }

})
export const { setMessage, setChatId, setTitle,setAllChats,setAllMessage,setisImage } = chatSlice.actions
export default chatSlice.reducer