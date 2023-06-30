const { hash, compare } = require("bcryptjs")

class UserService {
    constructor(UserRepository) {
        this.userRepository = UserRepository
    }

    async createUser(request) {
        const { name, email, password } = request.body

        try {
            const checkEmailInUsing = await this.userRepository.getByEmail(email)

            if (checkEmailInUsing) {
                throw new Error("Esse email já está em uso")
            }

            const cryptedPassword = await hash(password, 8)
            const id = await this.userRepository.create({ name, email, cryptedPassword })

            if (email == "master@admin.com") {
                const user = await this.userRepository.getById(id[0])
                user.isAdmin = true
                await this.userRepository.update(user, id[0])
                return { message: "Administrador primário criado com sucesso!", statusCode: 201 };
            }

            return { message: "Usuário criado com sucesso", statusCode: 201 }

        } catch (error) {
            if (error.message) {
                console.error(error.message)
                return { message: error.message, statusCode: 409 }
            } else {
                console.error(error)
                return { message: "Internal Server Error", statusCode: 500 }
            }

        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.getByEmail(email)

            if (!user) {
                throw new Error("Usuário não encontrado")
            }
            return { data: user, statusCode: 200 }

        } catch (error) {
            if (error.message) {
                console.error(error.message)
                return { statusCode: 404 }
            } else {
                console.error("Internal Server Error")
                return { statusCode: 500 }
            }
        }
    }

    async getUserById(id) {
        try {
            const user = await this.userRepository.getById(id)

            if (!user) {
                throw new Error("Usuário não encontrado")
            }

            return user

        } catch (error) {
            console.error(error)
        }
    }

    async updateData(request) {
        const { name, email, oldPassword, newPassword } = request.body
        const userId = request.user.id

        try {
            const user = await this.userRepository.getById(userId)

            if (!user) {
                console.log(user)
                throw new Error("Usuário não encontrado, verifique se você está autenticado")
            }

            if (email) {
                const emailExists = await this.userRepository.getByEmail(email)

                if (emailExists && emailExists.id !== user.id) {
                    throw new Error("O email já está em uso")
                }
            }

            user.name = name ?? user.name
            user.email = email ?? user.email

            if (oldPassword && !newPassword) {
                throw new Error("Você precisa informar sua senha anterior antes de criar uma nova")
            }

            if (oldPassword && newPassword) {
                const checkMatchPasswords = await compare(oldPassword, user.password)

                if (checkMatchPasswords) {
                    throw new Error("Senha incorreta")
                }

                user.password = await hash(newPassword, 8)
            }

            await this.userRepository.update(user, userId)

            return { message: "Informações atualizadas com sucesso", statusCode: 200 }

        } catch (error) {
            if (error.message) {
                return { message: error.message, statusCode: 401 }
            } else {
                return { message: "Internal Server Error", statusCode: 500 }
            }
        }
    }

    async toggleAdmin(request) {
        const authenticatedUserId = request.user.id
        const { userId } = request.params

        try {
            const authenticatedUser = await this.userRepository.getById(authenticatedUserId)
            const targetUser = await this.userRepository.getById(userId)

            if (authenticatedUser.email != "master@admin.com") {
                throw new Error("Apenas o administrador mestre pode alterar as permissões de outros usuários")
            }

            !targetUser.isAdmin ? targetUser.isAdmin = true : targetUser.isAdmin = false

            await this.userRepository.update(targetUser, userId)

            return { message: "Permissão de administrador alterada com sucesso", statusCode: 200 }

        } catch (error) {
            if (error.message) {
                console.error(error.message)
                return { message: error.message, statusCode: 401 }
            } else {
                console.error(error)
                return { message: "Internal Server Error", statusCode: 500 }
            }
        }
    }
}

module.exports = UserService