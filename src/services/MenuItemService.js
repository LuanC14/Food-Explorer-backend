class MenuItemService {

    constructor(MenuItemRepository, IngredientsService, UserService) {
        this.menuItemRepository = MenuItemRepository
        this.ingredientsService = IngredientsService
        this.userService = UserService
    }

    async createItem(request) {
        const { name, type, description, value, ingredients } = request.body
        const userId = request.user.id

        try {
            const user = await this.userService.getUserById(userId)
            const allItems = await this.menuItemRepository.getAll()
            const findExistsItemByName = allItems.some(item => item.name == name)

            if (findExistsItemByName) {
                throw new Error("Já existe um item com este nome, caso seja um item diferente, especifique no nome.")
            }

            if (!user.isAdmin) {
                throw new Error("Você não tem permissão para inserir items no menu.")
            }

            if (type != "drink" && type != "refeição" && type != "sobremesa") {
                throw new Error("O cardápio do restaurante só aceita drinks, refeições e sobremesas.")
            }

            const item = {
                user_id: userId,
                name,
                type,
                description,
                value
            }

            const itemId = await this.menuItemRepository.create(item)

            if (ingredients) {
                await this.ingredientsService.insert(itemId, ingredients)
            }

            return { id: itemId, statusCode: 201 }

        } catch (error) {

            if (error.message = "Já existe um item com este nome, caso seja um item diferente, especifique no nome.") {
                console.error(error.message)
                return { statusCode: 409 }
            }

            if (error.message === "Você não tem permissão para inserir itens no Menu") {
                console.error(error.message)
                return { statusCode: 401 }
            }

            if (error.message === "O cardápio do restaurante só aceita drinks, refeições e sobremesas") {
                console.error(error.message)
                return { statusCode: 400 }
            }

            console.error(error);
            return { statusCode: 500 }
        }
    }

    async updateItem(request) {
        const { name, description, ingredients } = request.body
        const itemId = request.params.id
        const userId = request.user.id

        try {
            const item = await this.menuItemRepository.getById(itemId)

            if (!item) {
                throw new Error("Item não encontrado")
            }

            const user = await this.userService.getUserById(userId)
            console.log(user)

            if (!user.isAdmin) {
                throw new Error("Você não tem permissão para fazer alterações")
            }

            item.name = name ?? item.name
            item.description = description ?? item.description

            if (ingredients) {
                await this.ingredientsService.insert(itemId, ingredients)
            }

            await this.menuItemRepository.update(itemId, item)

            return { message: "Item atualizado com sucesso", statusCode: 200 }

        } catch (error) {
            if (error.message === "Você não tem permissão para fazer alterações") {
                console.error(error.message)
                return { message: error.message, statusCode: 404 }
            }

            if (error.message === "Você não tem permissão para fazer alterações") {
                console.error(error.message)
                return { message: error.message, statusCode: 401 }
            }

            return { message: "Internal Server Error", statusCode: 500 }
        }
    }

    async updateImage(request, diskStorage) {
        const imageFilename = request.file.filename
        const userId = request.user.id
        const itemId = request.params.id

        try {
            const user = await this.userService.getUserById(userId)

            if (!user.isAdmin) {
                throw new Error("Você não tem permissão para realizar esta operação")
            }

            const item = await this.menuItemRepository.getById(itemId)

            if (!item) {
                throw new Error("Item não encontrado")
            }

            if (item.image_url) {
                await diskStorage.deleteFile(item.image_url)
            }

            const filename = await diskStorage.saveFile(imageFilename)

            item.image_url = filename

            console.log(item)

            await this.menuItemRepository.update(itemId, item)

            return { data: item, statusCode: 200 }


        } catch (error) {
            if (error.message === "Você não tem permissão para realizar esta operação") {
                return { statusCode: 401 }
            }

            if (error.message === "Item não encontrado") {
                return { statusCode: 404 }
            }
            console.error(error)
            return { statusCode: 500 }
        }
    }

    async getItems(request) {
        const { id } = request.query

        if (!id) {
            const data = await this.menuItemRepository.getAll()
            return { data, statusCode: 200 }
        }

        try {
            const item = await this.menuItemRepository.getById(id)

            if (!item) {
                throw new Error("Item não encontrado")
            }

            const ingredients = await this.ingredientsService.getIngredientById(item.id)

            if (ingredients) {
                const itemWithIngredients = {
                    item,
                    ingredients
                }

                return { data: itemWithIngredients, statusCode: 200 }
            }

            return { data: item, statusCode: 200 }

        } catch (error) {
            error.message ? console.error(error.message) : console.error(error)
            return { statusCode: 404 }
        }
    }

    async searchItem(request) {
        const { name } = request.query

        try {
            let allItems = [];

            const ingredients = await this.ingredientsService.getIngredientByName(name)

            if (ingredients.length > 0) {
                const ingredientIds = ingredients.map(ingredient => ingredient.menu_item_id)

                for (const id of ingredientIds) {
                    const item = await this.menuItemRepository.getById(id)
                    allItems.push(item)
                }
            }

            const items = await this.menuItemRepository.getByName(name)

            if (items) {
                for (const item of items) {
                    allItems.push(item)
                }
            }

            if (allItems.length <= 0) {
                throw new Error("Nenhum item encontrado")
            }

            return { data: allItems, statusCode: 200 }

        } catch (error) {
            console.error(error.message)
            return { statusCode: 404 }
        }
    }

    async removeItem(request) {
        const { id } = request.params
        const userId = request.user.id

        try {
            const user = await this.userService.getUserById(userId)
            const verifyIsMasterAdmin = user.email === "master@admin.com"

            if (verifyIsMasterAdmin) {
                await this.menuItemRepository.delete(id)
                return { statusCode: 204 }
            }

            const item = await this.menuItemRepository.getById(id)

            if (!item) {
                throw new Error("Item não encontrado")
            }

            const checkItemCreatorId = item.user_id === userId

            if (checkItemCreatorId) {
                await this.menuItemRepository.delete(id)
                return { statusCode: 204 }
            } else {
                throw new Error("Você não pode remover um item que você não criou")
            }

        } catch (error) {
            if (error.message === "Item não encontrado") {
                return { statusCode: 404 }
            }

            if (error.message === "Você não pode remover um item que você não criou") {
                return { statusCode: 401 }
            }

            return { statusCode: 500 }
        }

    }
}

module.exports = MenuItemService