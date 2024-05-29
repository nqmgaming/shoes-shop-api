const Order = require("../models/order.model");

// Get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "email");
        if (!orders) {
            return res.status(404).json({ message: "Orders not found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by id
exports.getOrderById = async (req, res, next) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders by user ID
exports.getOrdersByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const orders = await Order.find({ user: userId });
        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found for this user' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create order
exports.createOrder = async (req, res, next) => {
    const { user, products, address, phoneNumber, email, total, paymentMethod } = req.body;

    if (!user || !products || !address || !phoneNumber || !email || total === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newOrder = new Order({
            user,
            products,
            address,
            phoneNumber,
            email,
            total,
            paymentMethod
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update order status by id
exports.updateOrderStatus = async (req, res, next) => {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ message: 'Order ID and status are required' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete order by id
exports.deleteOrderById = async (req, res, next) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await Order.findByIdAndDelete(orderId);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
