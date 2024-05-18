const express = require('express');
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.authenticateToken, productController.getAllProducts);
router.get('/search', authMiddleware.authenticateToken, productController.searchProductsByName);
router.get('/category/:categoryId', authMiddleware.authenticateToken, productController.getProductsByCategoryId);
router.get('/:id', authMiddleware.authenticateToken, productController.getProductById);
router.patch('/:id', authMiddleware.authenticateToken, productController.updateProductStock);

module.exports = router;
