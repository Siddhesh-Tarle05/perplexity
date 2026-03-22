import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import sendEmail from "../services/mail.service.js"

  async function registerController(req,res) {
    let {username,email,password}=req.body  
    let Userexits=await userModel.findOne({ $or: [{ email }, { username }] })
    if(Userexits){
        return res.status(400).json({message:"User already exists",success:false,err:"user already exists"})
    }
    let user=await userModel.create({username,email,password})
    const userVerificationToken=jwt.sign({id:user._id},process.env.JWT_SECRET)

    await sendEmail({to:email, subject:"Welcome to Perplexity", text:`Thank you for registering with Perplexity. We're excited to have you on board!>Verify Email</a>`, html:`<h1>Welcome to Perplexity</h1><p>Thank you for registering with Perplexity. We're excited to have you on board!</p> <a href='http://localhost:3000/api/auth/verify-email?token=${userVerificationToken}'>Verify Email</a>`})
     
    res.status(201).json({
      message:"user created",
      user
    })
}
async function verifyEmail(req,res) {
  let {token}=req.query
  let decoded=jwt.verify(token,process.env.JWT_SECRET)
  let user=await userModel.findOne({_id:decoded.id})
  if(!user){
    return res.status(400).json({
      message:"Invalid Token",
      success:false,
      err:'user not found'
    })
  }
  user.verfied=true
  await user.save()
  const html=`<h1>Email Verified</h1><p>Your email has been successfully verified. You can now log in to your account.</p>`
  res.send(html)
}
async function loginController(req,res) {
  let {email,password}=req.body
  console.log(email,password)
  let user=await userModel.findOne({email})
  if(!user){
    return res.status(400).json({
      message:"Invalid Credentials",
      success:false,
      err:'user not found'
    })
  }
   let isMatch=await user.comparePassword(password)
   console.log(isMatch)
   if(!isMatch){
    return res.status(400).json({
      message:"Invalid Credentials",
      success:false,
      err:'invalid password',
    })
   }
   if(!user.verfied){
    return res.status(400).json({
      message:"Email not verified",
      success:false,
      err:'please verify your email'
    })
   }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'4d'})
    res.cookie('token',token)
    
    res.status(200).json({
      message:"Login successful",
      success:true,
      token,
       user
    })
}
async function getMeController(req,res) {
  console.log(req.user)
  let user=await userModel.findById(req.user.id).select("-password")
  if(!user){
    return res.status(400).json({
      message:"User not found", 
      success:false,
      err:'user not found'
    })
  }

  res.status(200).json({
    message:"User fetched successfully",
    success:true,
    user
  })
}
export default {registerController, verifyEmail, loginController, getMeController}