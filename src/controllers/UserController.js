const UserRepository = require("../repositories/UserRepository")
const UserService = require("../services/UserService")

class UserController {

    async createUser(request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)
        const result = await userService.createUser(name, email, password)

        return response.status(result.statusCode).send(result.message)
    }

    async updateData(request, response) {
        const { name, email, password } = request.body
        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)

        return null
    }
}

module.exports = UserController