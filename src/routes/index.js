const { Router } = require("express")

const authRouter = require("./auth.routes")
const userRouter = require('./user.routes')

const routes = Router()

routes.use("/api/v1/auth", authRouter)
routes.use("/api/v1/user", userRouter)

module.exports = routes