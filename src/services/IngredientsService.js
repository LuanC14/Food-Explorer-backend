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
}

module.exports = IngredientsService