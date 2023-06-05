const { Router } = require("express")

const MenuItemController = require("../controllers/MenuItemController")
const authMiddleware = require("../middlewares/authMiddleware")

const menuItemRouter = Router()
const menuItemController = new MenuItemController()

menuItemRouter.get("/", menuItemController.getItems)
menuItemRouter.get("/search", menuItemController.searchByNameAndIngredient)
menuItemRouter.post("/", authMiddleware, menuItemController.createItem)
menuItemRouter.delete("/:id", authMiddleware, menuItemController.deleteItemById)

module.exports = menuItemRouter