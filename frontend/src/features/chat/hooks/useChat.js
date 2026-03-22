import { initializeSocket } from "../services/chat.socket";
import { Sendmessage } from "../services/chat.api.js";
import { useDispatch } from "react-redux";
import { createNewChat, setChats, setCurrentChatId, setError, setLoading, setNewMessages } from "../chat.slice";
export const useChat = () => {
    const dispatch = useDispatch()
    const handleChatMessage = async ({ message, chatId }) => {
        console.log(chatId)
        dispatch(setLoading(true))
        let response = await Sendmessage({ message, chatId })
        console.log(response)
        dispatch(setCurrentChatId(chatId || response.chat._id))
        if (!chatId) {
            dispatch(createNewChat({ chatId: chatId || response.chat._id, title: response.title }))
        }

        dispatch(setNewMessages({ chatId: chatId || response.chat._id, message, role: "user" }))
        dispatch(setNewMessages({ chatId: chatId || response.chat._id, message: response.AiMessage.content, role: "assistant" }))

        dispatch(setLoading(false))
    }
    const getChats = async () => {
        dispatch(setLoading(true))
        try {
            const response = await getChats()
            dispatch(setChats(response.chats))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        initializeSocket,
        handleChatMessage,
        getChats
    }

}