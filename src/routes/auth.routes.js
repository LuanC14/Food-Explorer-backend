const { Router } = require("express")

const authRouter = Router()
const AuthController = require("../controllers/AuthController")
const authController = new AuthController()

authRouter.post("/", authController.createSession)

module.exports = authRouter