const { Router } = require("express")
const multer = require("multer")

const MenuItemController = require("../controllers/MenuItemController")
const authMiddleware = require("../middlewares/authMiddleware")

const menuItemRouter = Router()
const menuItemController = new MenuItemController()
const uploadConfig = require("../configs/uploadConfig")
const upload = multer(uploadConfig.MULTER)

menuItemRouter.get("/", menuItemController.getItems)
menuItemRouter.get("/search", menuItemController.searchByNameAndIngredient)
menuItemRouter.put("/:itemId", authMiddleware, menuItemController.updateItem)
menuItemRouter.patch("/image/:itemId", authMiddleware, upload.single("image"), menuItemController.setImage)
menuItemRouter.post("/", authMiddleware, menuItemController.createItem)
menuItemRouter.delete("/:itemId", authMiddleware, menuItemController.deleteItemById)

module.exports = menuItemRouter