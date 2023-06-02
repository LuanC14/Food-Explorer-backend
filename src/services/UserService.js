const { hash } = require("bcryptjs")

class UserService {
    constructor(UserRepository) {
        this.userRepository = UserRepository
    }

    async createUser(name, email, password) {
        try {

            const checkEmailInUsing = await this.userRepository.getByEmail(email)

            if (checkEmailInUsing) {
                throw new Error("Esse email já está em uso")
            }

            const cryptedPassword = await hash(password, 8)

            await this.userRepository.create({ name, email, cryptedPassword })

            return { message: "Usuário criado com sucesso", statusCode: 201 }

        } catch (error) {

            if (error.message) {
                return { message: error.message, statusCode: 409 }
            }

            return { message: "Internal Several Error", statusCode: 500 }
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.getByEmail({email})

            if (!user) {
                throw new Error("Usuário não encontrado")
            }
            return user

        } catch (error) {
            if (error.message) {
                return console.error(error.message)
            } else {
                return console.error("Error in getUserByEmail in UserService")
            }
        }
    }
}

module.exports = UserService