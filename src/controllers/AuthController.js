const AuthService = require("../services/AuthService")
const UserService = require("../services/UserService")
const UserRepository = require("../repositories/UserRepository")

class AuthController {

    async CreateSession(request, response) {
        const { email, password } = request.body

        const userRepository = new UserRepository()
        const userService = new UserService(userRepository)
        const authService = new AuthService(userService)
        const result = await authService.createSession(email, password)

        return response.status(result.statusCode).json({ token: result.token, data: result.data })
    }

}

module.exports = AuthController