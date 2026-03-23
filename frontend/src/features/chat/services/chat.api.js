import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/api/chats",
    withCredentials:true
})

export async function Sendmessage({message,chatId}) {
    console.log(message)
    let response= await api.post('/message',{message,chatId})
    return response.data
}
export async function generateImage({prompt,chatId}) {
    let response= await api.post('/generate-image',{prompt,chatId})
    return response.data
}
export async function getChats() {
    let response=await api.get('/getchats')
    return response.data
}
export async function getMessages(chatId) {
    let response=await api.get(`/${chatId}/messages`)
    return response.data
}
