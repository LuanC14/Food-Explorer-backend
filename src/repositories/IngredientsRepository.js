const knex = require("../database/knex/index")

class IngredientsRepository {

    async insert(ingredients) {
        await knex("ingredients").insert(ingredients)
    }

    async getByName(name) {
        return await knex("ingredients").select().whereLike("name", `%${name}%`);
    }

    async getById(id) {
        return await knex("ingredients").select().where({menu_item_id: id})
    }
}

module.exports = IngredientsRepository