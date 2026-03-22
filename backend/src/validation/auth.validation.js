import { body, validationResult } from "express-validator"
function validateRequest(req,res,next){
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()

}
export const registerValidator=[
    body("username").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({min:6}),
    validateRequest
]