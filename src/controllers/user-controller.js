const UserService = require('../services/user-service.js')

const userService = new UserService()

const create = async(req,res)=>{
    try {
      const user = await userService.create({
        email:req.body.email,
        password:req.body.password
      })
      return res.status(201).json({
        success:true,
        data:user,
        error:{},
        message:"Successfully created user"
      })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            data:{},
            error:error,
            message:"something went wrong"
        })
    }
}
const signIn = async(req,res)=>{
  try {
    const response = await userService.signIn(req.body.email,req.body.password)
     return res.status(201).json({
        success:true,
        data:response,
        error:{},
        message:"Successfully signed in"
      })    
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            success:false,
            data:{},
            error:error,
            message:"something went wrong"
        })
  }
}
  const isAuthenticated = async(req,res)=>{
      try {
      const token = req.headers['x-access-token'] 
     const response = await userService.isAuthenticated(token)
     return res.status(200).json({
      success:true,
      data:response,
      error:{},
      message:"User is authenticated"
     })
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            success:false,
            data:{},
            error:error,
            message:"something went wrong"
        })
  }
  }
module.exports={create,signIn,isAuthenticated}