const { Router } = require("express")

const authRouter = require("./auth.routes")
const userRouter = require('./user.routes')
const menuItemRouter = require("./menuItem.routes")
const ingredientRouter = require("./ingredients.routes")

const routes = Router()

routes.use("/api/v1/auth", authRouter)
routes.use("/api/v1/user", userRouter)
routes.use("/api/v1/menu", menuItemRouter)
routes.use("/api/v1/ingredient", ingredientRouter)

module.exports = routes