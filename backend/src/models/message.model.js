import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats',
        required: true
    },
    type: {
    type: String, 
    default: "text",
    enum: ["text", "image"]
  },
    content: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:['user','ai'],
        required:true
    }
},{timestamps:true})
const messageModel=mongoose.model('messages',messageSchema)
export default messageModel