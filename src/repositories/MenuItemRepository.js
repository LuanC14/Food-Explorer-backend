const knex = require("../database/knex/index")

class MenuItemRepository {

    async create(item) {
        const [id] = await knex("menu_items").insert(item)
        return id
    }

    async update(id, item) {
        await knex("menu_items").update(item).where({id})
    }

    async getAll() {
        return await knex("menu_items").select()
    }

    async getById(id) {
        return await knex("menu_items").select().where({ id }).first()
    }

    async getByName(name) {
        return await knex("menu_items").select().whereLike("name", `%${name}%`)
    }

    async delete(id) {
        await knex("menu_items").where({ id }).delete()
    }
}

module.exports = MenuItemRepository