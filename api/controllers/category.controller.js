const Category = require("../models/category.model")

// Get all categories
exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({message: 'Categories not found'});
        } else if (categories.length === 0) {
            return res.status(404).json({message: 'No categories available'});
        }
        return res.status(200).json({
            data: categories
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get category by id
exports.getCategoryById = async (req, res, next) => {
    const categoryId = req.params.id;
    if (categoryId) {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }
            return res.status(200).json({
                data: category
            })
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'Category ID is required'});
    }
}
