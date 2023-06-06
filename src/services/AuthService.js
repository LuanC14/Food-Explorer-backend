const knex = require("../database/knex/index")
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const authConfig = require("../configs/authConfig")

class AuthService {

    constructor(userService) {
        this.userService = userService
    }

    async createSession(request) {
        const { email, password } = request.body

        try {
            const result = await this.userService.getUserByEmail(email)

            const user = result.data

            if (!user) {
                throw new Error("Email ou senha incorretos")
            }

            const verifyPassword = await compare(password, user.password)

            if (!verifyPassword) {
                throw new Error("Email ou senha incorretos")
            }

            const { secret, expiresIn } = authConfig.jwt

            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })

            const data = user
            delete data.password

            return { token, data, statusCode: 200 }

        } catch (error) {
            if (error.message) {
                return { message: error.message, statusCode: 401 }
            } else {
                return { message: "Internal Server Error", statusCode: 500 }
            }
        }
    }
}

module.exports = AuthService