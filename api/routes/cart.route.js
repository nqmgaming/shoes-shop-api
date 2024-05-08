const express = require('express');
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.authenticateToken, cartController.getAllCarts);
router.get('/:id', authMiddleware.authenticateToken, cartController.getCartById);
router.get('/user/:id', authMiddleware.authenticateToken, cartController.getCartsByUserId);
router.post('/', authMiddleware.authenticateToken, cartController.createCart);
router.patch('/:id', authMiddleware.authenticateToken, cartController.updateCart);
router.delete('/:id', authMiddleware.authenticateToken, cartController.deleteCart);

module.exports = router;
