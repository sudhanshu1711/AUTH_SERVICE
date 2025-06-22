const validateUserAuth = (req,res,next)=>{
    if(!req.body.email||!req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            error:"Email or password missing",
            message:"Something went wrong"
        })
    }
    next()
}
const validateAdminRequest = (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).json({
            success:false,
            data:{},
            error:"User Id is missing",
            message:"Something went wrong"
        })
    }
    next ()
}
module.exports ={
    validateUserAuth,
    validateAdminRequest
}