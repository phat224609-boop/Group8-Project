// backend/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); // <-- IMPORT CẢ 2

// GET /users (Lấy tất cả user)
router.get('/', protect, admin, userController.getAllUsers);

// POST /users (Tạo user)
router.post('/', protect, admin, userController.createUser);

// PUT /users/:id (Cập nhật user)
router.put('/:id', protect, admin, userController.updateUser);

// DELETE /users/:id (Xóa user)
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;