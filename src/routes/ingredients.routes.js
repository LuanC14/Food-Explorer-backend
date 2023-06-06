const { Router } = require("express")

const IngredientController = require("../controllers/IngredientController")
const authMiddleware = require("../middlewares/authMiddleware")

const ingredientRouter = Router()
const ingredientController = new IngredientController()

ingredientRouter.delete("/", authMiddleware, ingredientController.deleteIngredient)

module.exports = ingredientRouter