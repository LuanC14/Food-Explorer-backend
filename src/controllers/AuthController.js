const AuthService = require("../services/AuthService")
const UserService = require("../services/UserService")
const UserRepository = require("../repositories/UserRepository")

class AuthController {

    static injection() {
        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)
        const authService = new AuthService(userService)

        return { authService }
    }

    async createSession(request, response) {
        const { authService } = AuthController.injection()
        const result = await authService.createSession(request)
        return response.status(result.statusCode).json({ token: result.token, data: result.data })
    }

}

module.exports = AuthController