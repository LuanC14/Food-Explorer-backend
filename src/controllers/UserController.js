const UserRepository = require("../repositories/UserRepository")
const UserService = require("../services/UserService")

class UserController {

    static injection() {
        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)

        return { userService }
    }

    async createUser(request, response) {
        const { userService } = UserController.injection()
        const result = await userService.createUser(request)
        return response.status(result.statusCode).send(result.message)
    }

    async updateData(request, response) {
        const { userService } = UserController.injection()
        const result = await userService.updateData(request)
        return response.status(result.statusCode).send(result.message)
    }

    async getUserByEmail(request, response) {
        const { userService } = UserController.injection()
        const result = await userService.getUserByEmail(request.params.email)
        return response.status(result.statusCode).json(result.data)
    }

    async toggleAdmin(request, response) {
        const { userService } = UserController.injection()
        const result = await userService.toggleAdmin(request)
        return response.status(result.statusCode).send(result.message)
    }
}

module.exports = UserController