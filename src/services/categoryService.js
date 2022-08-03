const db = require('../database/models');

const loginService = {
    createCategory: async (name) => {
        const category = await db.Category.create({ name });
        return { id: category.null, name: category.dataValues.name };
    },
    validateName: (name) => {
        if (!name) {
            return { message: '"name" is required' };
        }
        return {};
    },
    getAllCategories: async () => {
        const categories = await db.Category.findAll();
        return categories;
    },
};

module.exports = loginService;
