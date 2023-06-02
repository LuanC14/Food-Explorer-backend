const knex = require("../database/knex/index")
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const authConfig = require("../configs/authConfig")

class AuthService {

    constructor(userService) {
        this.userService = userService
    }

    async createSession(email, password) {

        try {
            const user = await this.userService.getUserByEmail(email)

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

            return { token, statusCode: 200 }

        } catch (error) {
            if (error.message) {
                return { message: error.message, statusCode: 401 }
            } else {
                return { message: "Internal Several Error", statusCode: 500 }
            }
        }
    }
}

module.exports = AuthService