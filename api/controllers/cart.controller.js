const Cart = require('../models/cart.model');
const Product = require("../models/product.model")
// Get all carts
exports.getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find();
        if (!carts) {
            return res.status(404).json({message: 'Carts not found'});
        } else if (carts.length === 0) {
            return res.status(404).json({message: 'No carts available'});
        }
        return res.status(200).json({
            data: carts
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get cart by id
exports.getCartById = async (req, res, next) => {
    const cartId = req.params.id;
    if (cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return res.status(404).json({message: 'Cart not found'});
            }
            return res.status(200).json({
                data: cart
            })
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'Cart ID is required'});
    }
}

// Get all carts by user ID
exports.getCartsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    if (userId) {
        try {
            const carts = await Cart.find({user: userId})
            if (!carts) {
                return res.status(404).json({message: 'Carts not found'});
            } else if (carts.length === 0) {
                return res.status(404).json({message: 'No carts available'});
            }
            return res.status(200).json({
                data: carts
            })
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'User ID is required'});
    }
}

// Create a new cart
exports.createCart = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (data.user && data.items && data.items.product && data.items.quantity && data.items.price && data.items.size) {
        try {
            const cart = new Cart(req.body);
            const existingCart = await Cart.findOne({
                user: req.body.user,
                'items.product': req.body.items.product,
            });

            if (existingCart) {
                return res.status(400).json({error: 'Cart already exists'});
            }

            await cart.save();
            res.status(201).json({
                data: cart
            });

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'All fields are required'});
    }
}

// Update cart by id
exports.updateCart = async (req, res, next) => {
    const cartId = req.params.id;
    const itemQuantity = req.body.quantity;
    console.log(cartId, itemQuantity);
    if (cartId && itemQuantity) {
        try {
            const cart = await Cart.findById(cartId);
            cart.items.quantity = itemQuantity;
            await cart.save();
            res.status(200).json({
                data: cart
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'Cart ID and item quantity are required'});
    }
}

// Delete cart by id
exports.deleteCart = async (req, res, next) => {
    const cartId = req.params.id;
    if (cartId) {
        try {
            const cart = await Cart.findByIdAndDelete(cartId);
            if (!cart) {
                return res.status(404).json({message: 'Cart not found'});
            }
            res.status(204).json({
                message: 'Cart deleted successfully'
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'Cart ID is required'});
    }
}
