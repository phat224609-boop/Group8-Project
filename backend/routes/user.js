// backend/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); // <-- IMPORT CẢ 2

// --- CÁC ROUTE ĐÃ ĐƯỢC BẢO VỆ ---

// GET /users (Lấy tất cả user)
// Chỉ Admin mới được truy cập
router.get('/', protect, admin, userController.getAllUsers);

// POST /users (Tạo user)
// Chức năng này đã được /api/auth/signup thay thế
// Nhưng chúng ta vẫn bảo vệ nó
router.post('/', protect, admin, userController.createUser);

// PUT /users/:id (Cập nhật user)
// Chỉ Admin mới được truy cập
router.put('/:id', protect, admin, userController.updateUser);

// DELETE /users/:id (Xóa user)
// Chỉ Admin mới được truy cập
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;