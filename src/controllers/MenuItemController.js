const MenuItemRepository = require("../repositories/MenuItemRepository")
const UserRepository = require("../repositories/UserRepository")
const IngredientsRepository = require("../repositories/IngredientsRepository")

const MenuItemService = require("../services/MenuItemService")
const UserService = require("../services/UserService")
const IngredientsService = require("../services/IngredientsService")

const DiskStorage = require("../providers/DiskStorage")

class MenuItemController {

    static injection() {
        const menuItemRepository = new MenuItemRepository()
        const userRepository = new UserRepository()
        const ingredientsRepository = new IngredientsRepository()
        const userService = new UserService(userRepository)
        const ingredientsService = new IngredientsService(ingredientsRepository)
        const menuItemService = new MenuItemService(menuItemRepository, ingredientsService, userService)

        return { menuItemService }
    }

    async createItem(request, response) {
        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.createItem(request)
        return response.status(result.statusCode).json(result.id)
    }

    async setImage(request, response) {
        const diskStorage = new DiskStorage()

        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.updateImage(request, diskStorage)
        return response.status(result.statusCode).json(result.data)
    }

    async updateItem(request, response) {
        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.updateItem(request)
        return response.status(result.statusCode).send(result.message)
    }

    async getItems(request, response) {
        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.getItems(request)
        return response.status(result.statusCode).json(result.data)
    }

    async searchByNameAndIngredient(request, response) {
        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.searchItem(request)
        return response.status(result.statusCode).json(result.data)
    }

    async deleteItemById(request, response) {
        const diskStorage = new DiskStorage()

        const { menuItemService } = MenuItemController.injection()
        const result = await menuItemService.removeItem(request, diskStorage)
        return response.status(result.statusCode).json()
    }
}

module.exports = MenuItemController