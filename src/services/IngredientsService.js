class IngredientsService {
    constructor(IngredientsRepository) {
        this.ingredientsRepository = IngredientsRepository
    }

    async insert(id, ingredients) {

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                name: ingredient,
                menu_item_id: id
            }
        })

        await this.ingredientsRepository.insert(ingredientsInsert)
    }

    async getIngredientByName(name) {
        return await this.ingredientsRepository.getByName(name)
    }

    async getIngredientById(id) {
        return await this.ingredientsRepository.getById(id)
    }

    async deleteIngredient(request) {
        const ingredientId = request.params.ingredientId
        await this.ingredientsRepository.delete(ingredientId)
        return { statusCode: 204 }
    }
}

module.exports = IngredientsService