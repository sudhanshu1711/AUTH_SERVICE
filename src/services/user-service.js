const UserRepo = require('../repository/user-repo.js')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig.js')
const bcrypt = require('bcrypt')

class UserService {
    constructor(){
        this.UserRepo= new UserRepo()
    }
    async create(data){
        try {
            const user = await this.UserRepo.create(data)
            return user
        } catch (error) {
            console.log('something went wrong in service layer')
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
     async checkPassword(userPlainPassword,encryptedPassword){
        try {
            return await  bcrypt.compareSync(userPlainPassword,encryptedPassword)
        } catch (error) {
             console.log('something went wrong in password verification')
            throw error
        }
    }
}
module.exports = UserService