import jwt from 'jsonwebtoken'
async function identifyuser(req,res,next) {
    let token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Access denied. No token provided.",
            success:false
        })
    }
    try {
        let decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token.",
            success:false
        })
    }
}
export default identifyuser