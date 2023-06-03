const knex = require("../database/knex/index")

class MenuItemRepository {

    async create(item) {
        const [id] = await knex("menu_items").insert(item)
        return id
    }

    async getAllmenuItems() {
        return await knex("menu_items").select()
    }
}

module.exports = MenuItemRepository