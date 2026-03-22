import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/api/chats",
    withCredentials:true
})

export async function Sendmessage({message,chatId}) {
    let response= await api.post('/message',{message,chatId})
    return response.data
}
export async function getChats() {
    let response=await api.get('/getchats')
    return response.data
}
export async function getMessages(chatId) {
    let response=await api.get(`/${chatId}/messages`)
}
