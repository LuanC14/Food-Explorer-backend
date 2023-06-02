const { Router } = require("express")

const UserController = require("../controllers/UserController")
const authMiddleware = require("../middlewares/authMiddleware")

const userRouter = Router()
const userController = new UserController()

userRouter.post("/", userController.createUser)
userRouter.put("/", authMiddleware, userController.updateData)

module.exports = userRouter