exports.up = knex => knex.schema.createTable("menu_items", table => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("users")
    table.text("name").notNullable()
    table.text("type").notNullable()
    table.text("description").notNullable()
    table.integer("value").notNullable()
})

exports.down = knex => knex.schema.dropTable("menu_items")
