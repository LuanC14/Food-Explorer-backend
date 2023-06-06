const IngredientsRepository = require("../repositories/IngredientsRepository")
const IngredientsService = require("../services/IngredientsService")

class IngredientController {

    static injection() {
        const ingredientsRepository = new IngredientsRepository()
        const ingredientsService = new IngredientsService(ingredientsRepository)

        return { ingredientsService }
    }

    async deleteIngredient(request, response) {
        const { ingredientsService } = IngredientController.injection()
        const result = await ingredientsService.deleteIngredient(request)
        return response.status(result.statusCode).json()
    }
}

module.exports = IngredientController