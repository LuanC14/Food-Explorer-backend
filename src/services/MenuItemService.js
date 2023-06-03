class MenuItemService {

    constructor(MenuItemRepository, UserService, IngredientsService) {
        this.menuItemRepository = MenuItemRepository
        this.userService = UserService
        this.ingredientsService = IngredientsService
    }

    async createItem(request) {
        const { name, type, description, value, ingredients } = request.body
        const userId = request.user.id

        try {
            const user = await this.userService.getUserById(userId)
            const allItems = await this.menuItemRepository.getAllmenuItems()
            const findExistsItemByName = allItems.some(item => item.name == name)

            if (findExistsItemByName) {
                throw new Error("Já existe um item com este nome, caso seja um item diferente, especifique no nome.")
            }

            if (user.isAdmin == false) {
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

            if (ingredients.length > 0) {
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

    async getAll() {
        const data = await this.menuItemRepository.getAllmenuItems()
        return { data, statusCode: 200 }
    }
}

module.exports = MenuItemService