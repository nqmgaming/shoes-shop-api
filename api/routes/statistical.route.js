const express = require('express');
const router = express.Router();
const statisticalController = require("../controllers/statistical.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// This route is used to get statistical data for the admin dashboard
// So, the route is protected by the authenticateToken middleware

router.get('/totalUsers', authMiddleware.authenticateToken, statisticalController.getTotalUsers);
router.get('/totalProducts', authMiddleware.authenticateToken, statisticalController.getTotalProducts);
router.get('/totalOrders', authMiddleware.authenticateToken, statisticalController.getTotalOrders);
router.get('/totalRevenue', authMiddleware.authenticateToken, statisticalController.getTotalRevenue);
router.get('/totalCategories', authMiddleware.authenticateToken, statisticalController.getTotalCategories);
router.get('/totalSizes', authMiddleware.authenticateToken, statisticalController.getTotalSizes);

module.exports = router;
