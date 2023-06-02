const { Router } = require("express")

const UserController = require("../controllers/UserController")
const authMiddleware = require("../middlewares/authMiddleware")

const userRouter = Router()
const userController = new UserController()

userRouter.get("/:email", userController.getUserByEmail)
userRouter.post("/", userController.createUser)
userRouter.put("/", authMiddleware, userController.updateData)
userRouter.patch("/", authMiddleware, userController.toggleAdmin)

module.exports = userRouter