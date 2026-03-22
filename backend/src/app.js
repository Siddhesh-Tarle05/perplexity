import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import morgan from 'morgan'
dotenv.config();
import express from'express'
import authRouter from './routes/auth.routes.js'
import chatRouter from './routes/chats.routes.js'
const app=express()
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/chats', chatRouter)
export default app