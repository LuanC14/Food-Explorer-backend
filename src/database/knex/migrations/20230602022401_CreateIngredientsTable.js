exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.integer("menu_item_id").references("id").inTable("menu_items")
})

exports.down =knex => knex.schema.dropTable("notes")
