import { Sendmessage } from "../services/chat.api";
import { initializeSocket } from "../services/chat.socket";
import { setChatId, setMessage, setTitle, setAllChats } from "../chat.slice";
import { useDispatch } from "react-redux";
import { generateImage } from "../services/chat.api";
export const useChat = () => {
    const dispatch = useDispatch()
    async function handleChat({ message, chatId }) {
        let response = await Sendmessage({ message, chatId })
        console.log(response)
        dispatch(setChatId(chatId || response.chat._id))
        dispatch(setTitle(response.title))
        dispatch(setMessage({ message: message, role: 'user' }))
        dispatch(setMessage({ message: response.AiMessage.content, role: 'ai' }))
    }
    async function handlegenerateImage({ prompt, chatId }) {
        let response = await generateImage({ prompt, chatId })
              dispatch(setMessage({ message: prompt, role: 'user' }))
        dispatch(setMessage({ message: response.imageUrl, role: 'ai', type: 'image' }))
    }
    return {
        initializeSocket,
        handleChat,
        handlegenerateImage
    }

}