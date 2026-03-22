import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateResponse ,generateTitle} from "../services/ai.service.js";

async function messageController(req,res) {
    let {message,chatId}=req.body;
    let  user=req.user.id
    let chat=null, title=null
    if(!message){
        return res.status(400).json({ error: "Message is required" });
    }
    if(!chatId){
        title = await generateTitle(message);
         chat=await chatModel.create({user,title})
    }
    let userMessage=await messageModel.create({chat:chatId || chat._id ,content:message,role:'user'})
    const allMessages=await messageModel.find({chat:chatId || chat._id})
    const response = await generateResponse(allMessages);
    console.log(response)
    let AiMessage=await messageModel.create({chat:chatId || chat._id ,content:response,role:'ai'})
    res.status(201).json({
         title,
        chat,
        AiMessage
    })
}
async function getChatsController(req,res){
    let user=req.user.id
    let chats=await chatModel.find({user})
    res.status(200).json({chats:chats})
}

async function getMessagesController(req,res){
    let {chatid}=req.params;
    let user=req.user.id
    let chat=await chatModel.findOne({_id:chatid,user}) 
    if(!chat){
        return res.status(404).json({error:"Chat not found"})
    }
    let messages=await messageModel.find({chat:chatid})
    res.status(200).json({messages:messages})
}

export default {
    messageController,
    getChatsController,
    getMessagesController
}
