const {User} = require('../models/index.js')

class UserRepo {
    async create(data){
      try {
        const user = await User.create(data)
        return user
      } catch (error) {
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
    }
module.exports = UserRepo