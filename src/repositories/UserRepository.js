const knex = require("../database/knex/index")

class UserRepository {

    async create({ name, email, cryptedPassword }) {

      const id =  await knex("users").insert({ name, email, password: cryptedPassword })
      console.log(id)
    }

    async getByEmail({email}) {
        let user = await knex("users").where({ email }).first()

        return user
    }
}

module.exports = UserRepository