import mongoose from "mongoose";
import bcrypt from 'bcrypt'
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    verfied:{
      type:Boolean,
      default:false
    }
},{timestamps:true})
userSchema.pre("save",async function () {
    if(!this.isModified('password')) return 
        this.password=await bcrypt.hash(this.password,10)
    
})
userSchema.methods.comparePassword=function(password){
  return bcrypt.compare(password,this.password)
}
const userModel=mongoose.model('users',userSchema)
export default userModel