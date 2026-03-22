import express from 'express';
const chatRouter=express.Router();
import identifyUser from '../middlewares/auth.middleware.js';
import chatController from '../controllers/chat.controller.js';

chatRouter.post('/message',identifyUser,chatController.messageController);
chatRouter.get('/getchats',identifyUser,chatController.getChatsController);
chatRouter.get('/:chatid/messages',identifyUser,chatController.getMessagesController);
export default chatRouter;