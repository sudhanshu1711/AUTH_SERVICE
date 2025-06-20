const UserRepo = require('../repository/user-repo.js')

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
}
module.exports = UserService