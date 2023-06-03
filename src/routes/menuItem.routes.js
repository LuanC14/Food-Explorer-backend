const { Router } = require("express")

const MenuItemController = require("../controllers/MenuItemController")
const authMiddleware = require("../middlewares/authMiddleware")

const menuItemRouter = Router()
const menuItemController = new MenuItemController()

menuItemRouter.get("/", menuItemController.getAllMenuItems)
menuItemRouter.post("/", authMiddleware, menuItemController.createItem)

module.exports = menuItemRouter