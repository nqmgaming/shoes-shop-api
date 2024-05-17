const Product = require('../models/product.model');

// Get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category').populate('size');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get product by id

exports.getProductById = async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({message: 'Product ID is required'});
    }

    try {
        const product = await Product.findById(productId).populate('category').populate('size');
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Search products by name
exports.searchProductsByName = async (req, res, next) => {
    const productName = req.query.name;
    if (!productName) {
        return res.status(400).json({message: 'Product name is required'});
    }

    try {
        const products = await Product.find({name: new RegExp(productName, 'i')});
        if (!products.length) {
            return res.status(404).json({message: 'No products found'});
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Update product stock by id
exports.updateProductStock = async (req, res, next) => {
    const productId = req.params.id;
    const newStock = req.body.stock;
    if (!productId || newStock === undefined) {
        return res.status(400).json({message: 'Product ID and new stock are required'});
    }

    try {
        const product = await Product.findByIdAndUpdate(productId, {stock: newStock}, {new: true});
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
