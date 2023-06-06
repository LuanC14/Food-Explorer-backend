const authConfig = require("../configs/authConfig")
const { verify } = require("jsonwebtoken")

function authMiddleware(request, response, next) {

    const authHeader = request.headers.authorization

    try {
        if (!authHeader) {
            throw new Error("Token não encontrado")
        }

        const [bearer, token] = authHeader.split(" ")

        const checkedToken = verify(token, authConfig.jwt.secret)

        if(!checkedToken) {
            throw new Error("Token inválido")
        }

        const { sub: user_id } = checkedToken

        request.user = {
            id: Number(user_id)
        }

        return next()

    } catch (error) {
        error.message ? response.status(401).send(error.message) : response.status(500).send("Server Internal Error: auth middleware")
    }
}

module.exports = authMiddleware