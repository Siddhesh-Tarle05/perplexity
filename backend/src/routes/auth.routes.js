import express from 'express';
import authController from '../controllers/auth.controller.js';
import { registerValidator } from '../validation/auth.validation.js';
import identifyuser from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, authController.registerController);
authRouter.get('/verify-email', authController.verifyEmail);
authRouter.post('/login', authController.loginController);
authRouter.get('/get-me', identifyuser, authController.getMeController);
export default authRouter;