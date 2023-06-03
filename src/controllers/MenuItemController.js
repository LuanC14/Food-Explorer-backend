const MenuItemRepository = require("../repositories/MenuItemRepository")
const UserItemRepository = require("../repositories/UserRepository")
const IngredientsRepository = require("../repositories/IngredientsRepository")

const MenuItemService = require("../services/MenuItemService")
const UserService = require("../services/UserService")
const IngredientsService = require("../services/IngredientsService")

class MenuItemController {

    async createItem(request, response) {
        const menuItemRepository = new MenuItemRepository()
        const userItemRepository = new UserItemRepository()
        const ingredientsRepository = new IngredientsRepository()

        const userService = new UserService(userItemRepository)
        const ingredientsService = new IngredientsService(ingredientsRepository)
        const menuItemService = new MenuItemService(menuItemRepository, userService, ingredientsService)

        const result = await menuItemService.createItem(request)

        return response.status(result.statusCode).json(result.id)
    }

    async getAllMenuItems(request, response) {
        const menuRepository = new MenuItemRepository()
        const menuItemService = new MenuItemService(menuRepository)
        const result = await menuItemService.getAll();

        return response.status(result.statusCode).json(result.data)
    }

}

module.exports = MenuItemController