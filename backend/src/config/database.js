import mongoose from "mongoose";
export function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected to DB')
    })
}