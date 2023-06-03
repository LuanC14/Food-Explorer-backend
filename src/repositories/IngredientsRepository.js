const knex = require("../database/knex/index")

class IngredientsRepository {

    async insert(ingredients) {
        await knex("ingredients").insert(ingredients)
    }
}

module.exports = IngredientsRepository