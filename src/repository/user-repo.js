const  ValidationError  = require('../utils/validation-error.js')
const {User,Roles} = require('../models/index.js')
const ClientError = require('../utils/client-error.js')
const {StatusCodes} = require('http-status-codes')

class UserRepo {
    async create(data){
      try {
        const user = await User.create(data)
        return user
      } catch (error) {
        if(error.name==='SequelizeValidationError'){
        let validationError = new ValidationError(error)
        throw validationError
      }
        console.log('something went wrong on repo layer')
        throw error
      }
    }
    async destroy (id){
        try {
            const user = await User.destroy({
                where:{
                    id:id
                }
            })
            return user
        }
       catch (error) {
        console.log('something went wrong on repo layer')
        throw error
      }
    }
    async getById(id){
      try {
        const user = await User.findByPk(id,{
          attributes:["email","id"] 
        })
         return user
      } catch (error) {
        console.log('something went wrong on repo layer')
        throw error
      }
    }
    async getByEmail(email){
      try {
        const user = await User.findOne({where:{email:email}})
        if(!user){
          throw new ClientError(
            'Attribute not found',
            "Invalid email sent",
            'Please check the email' ,
            StatusCodes.NOT_FOUND
          )
        }
        return user
      } catch (error) {
         console.log('something went wrong on repo layer')
        throw error
      }
    }
    async isAdmin(userId){
      try {
        const user = await User.findByPk(userId)
        const adminRole = await Roles.findOne({
          where:{
            name:'ADMIN'
          }
        })
        return await user.hasRole(adminRole)
      } catch (error) {
        console.log('something went wrong on repo layer')
        throw error
      }
    }
    }
module.exports = UserRepo