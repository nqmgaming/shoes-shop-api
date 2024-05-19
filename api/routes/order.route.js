const express = require('express');
const router = express.Router();

const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.authenticateToken, orderController.getAllOrders);
router.get('/:id', authMiddleware.authenticateToken, orderController.getOrderById);
router.get('/user/:userId', authMiddleware.authenticateToken, orderController.getOrdersByUserId);
router.post('/', authMiddleware.authenticateToken, orderController.createOrder);
router.patch('/:id', authMiddleware.authenticateToken, orderController.updateOrderStatus);
router.delete('/:id', authMiddleware.authenticateToken, orderController.deleteOrderById);

module.exports = router;
