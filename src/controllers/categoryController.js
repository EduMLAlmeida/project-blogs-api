const categoryService = require('../services/categoryService');

const categoryController = {
    createCategory: async (req, res) => {
        const { name } = req.body;
        const isNameValid = categoryService.validateName(name);
        if (isNameValid.message) return res.status(400).json({ message: isNameValid.message });
        const category = await categoryService.createCategory(name);
        return res.status(201).json(category);
    },
    getAllCategories: async (req, res) => {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    },
};

module.exports = categoryController;
