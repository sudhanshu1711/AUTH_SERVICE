const UserRepo = require('../repository/user-repo.js')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig.js')
const bcrypt = require('bcrypt')

class UserService {
    constructor(){
        this.userRepo= new UserRepo()
    }
    async create(data){
        try {
            const user = await this.userRepo.create(data)
            return user
        } catch (error) {
            if(error.name='SequelizeValidationError'){
                throw error
            }
            console.log('something went wrong in service layer')
            throw error
        }
    }
    async signIn(email,passsword){
        try {
            const user = await this.userRepo.getByEmail(email)
            const passswordMatch =  this.checkPassword(passsword,user.password)
            if(!passswordMatch){
                throw {error:"Incorrect Password"}
            }
            const newJWT = this.createToken({email:user.email,id:user.id})
            return newJWT
        } catch (error) {
            console.log('something went wrong with sign in')
            throw error
        }
    }
    createToken(user) {
        try {
        const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'})
        return result            
        } catch (error) {
            console.log('something went wrong in token creation')
            throw error
        }
    }
    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY)
            return response
        } catch (error) {
            console.log('something went wrong in token verification')
            throw error
        }
    }
      checkPassword(userPlainPassword,encryptedPassword){
        try {
            return   bcrypt.compareSync(userPlainPassword,encryptedPassword)
        } catch (error) {
             console.log('something went wrong in password verification')
            throw error
        }
    }
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token)
            if(!response){throw {error:'Invalid token'}}
            const user = await this.userRepo.getById(response.id)
            if(!user){
                throw {error:'No user with the corresposnding token exists'}
            }
            return user.id
        } catch (error) {
            console.log('something went wrong in auth verification')
            throw error
        }
    }
   async isAdmin(userId){
      try {
        return await this.userRepo.isAdmin(userId)
      } catch (error) {
          console.log('something went wrong while checking the role')
            throw error 
      }
    }
}
module.exports = UserService