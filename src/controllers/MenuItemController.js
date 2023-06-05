const MenuItemRepository = require("../repositories/MenuItemRepository")
const UserItemRepository = require("../repositories/UserRepository")
const IngredientsRepository = require("../repositories/IngredientsRepository")

const MenuItemService = require("../services/MenuItemService")
const UserService = require("../services/UserService")
const IngredientsService = require("../services/IngredientsService")
const UserRepository = require("../repositories/UserRepository")

class MenuItemController {

    async createItem(request, response) {
        const menuItemRepository = new MenuItemRepository()
        const userItemRepository = new UserItemRepository()
        const ingredientsRepository = new IngredientsRepository()

        const userService = new UserService(userItemRepository)
        const ingredientsService = new IngredientsService(ingredientsRepository)

        const menuItemService = new MenuItemService(menuItemRepository, ingredientsService, userService)
        const result = await menuItemService.createItem(request)

        return response.status(result.statusCode).json(result.id)
    }

    async getItems(request, response) {
        const menuItemRepository = new MenuItemRepository()
        const ingredientsRepository = new IngredientsRepository()

        const ingredientsService = new IngredientsService(ingredientsRepository)

        const menuItemService = new MenuItemService(menuItemRepository, ingredientsService)
        const result = await menuItemService.getItems(request)

        return response.status(result.statusCode).json(result.data)
    }

    async searchByNameAndIngredient(request, response) {
        const menuItemRepository = new MenuItemRepository()
        const ingredientsRepository = new IngredientsRepository()

        const ingredientsService = new IngredientsService(ingredientsRepository)

        const menuItemService = new MenuItemService(menuItemRepository, ingredientsService)
        const result = await menuItemService.searchItem(request)

        return response.status(result.statusCode).json(result.data)
    }

    async deleteItemById(request, response) {
        const menuItemRepository = new MenuItemRepository()
        const userRepository = new UserRepository()

        const userService = new UserService(userRepository)

        const menuItemService = new MenuItemService(menuItemRepository, null, userService)
        const result = await menuItemService.removeItem(request)

        return response.status(result.statusCode).json()
    }
}

module.exports = MenuItemController