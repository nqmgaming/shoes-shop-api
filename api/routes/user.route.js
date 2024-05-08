const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/checkUserExits/:email', userController.checkUserExits);
router.post('/signIn', userController.signIn);
router.post('/signUp', upload.single('image'), userController.signUp);
router.patch('/updateUser/:id', authMiddleware.authenticateToken, upload.single('avatar'), userController.updateUser);

module.exports = router;
