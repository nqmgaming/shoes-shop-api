const Users = require('../models/user.model');
const Products = require('../models/product.model');
const Orders = require('../models/order.model');
const Sizes = require('../models/size.model');

// Get total users
exports.getTotalUsers = async (req, res, next) => {
    try {
        const totalUsers = await Users.countDocuments();
        return res.status(200).json({totalUsers});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total products
exports.getTotalProducts = async (req, res, next) => {
    try {
        const totalProducts = await Products.countDocuments();
        return res.status(200).json({totalProducts});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total orders
exports.getTotalOrders = async (req, res, next) => {
    try {
        const totalOrders = await Orders.countDocuments();
        return res.status(200).json({totalOrders});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total revenue
exports.getTotalRevenue = async (req, res, next) => {
    try {
        const totalRevenue = await Orders.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: '$totalPrice'}
                }
            }
        ]);
        return res.status(200).json({totalRevenue: totalRevenue[0].total});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total categories
exports.getTotalCategories = async (req, res, next) => {
    try {
        const totalCategories = await Products.distinct('category');
        return res.status(200).json({totalCategories: totalCategories.length});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total sizes
exports.getTotalSizes = async (req, res, next) => {
    try {
        const totalSizes = await Sizes.countDocuments();
        return res.status(200).json({totalSizes});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get total products by size
exports.getTotalProductsBySize = async (req, res, next) => {
    try {
        const totalProductsBySize = await Products.aggregate([
            {
                $group: {
                    _id: '$size',
                    total: {$sum: 1}
                }
            }
        ]);
        return res.status(200).json({totalProductsBySize});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
