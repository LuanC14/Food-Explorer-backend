const authConfig = require("../configs/authConfig")
const { verify } = require("jsonwebtoken")

function authMiddleware(request, response, next) {

    const authHeader = request.headers.authorization

    try {
        if (!authHeader) {
            throw new Error("Token não encontrado")
        }

        const [bearer, token] = authHeader.split(" ")

        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()

    } catch (error) {
        error.message ? response.status(401).send(error.message) : response.status(401).send("Token inválido")
    }
}

module.exports = authMiddleware