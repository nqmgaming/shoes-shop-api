const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const categoryController = require("../controllers/category.controller");

router.get('/', authMiddleware.authenticateToken, categoryController.getAllCategory);
router.get('/:id', authMiddleware.authenticateToken, categoryController.getCategoryById);

module.exports = router;
