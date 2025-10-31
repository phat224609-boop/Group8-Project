// backend/routes/user.js
const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controllers/userController');

// GET (lấy tất cả)
router.get('/', userController.getAllUsers);

// POST (tạo mới)
router.post('/', userController.createUser);

// --- HOẠT ĐỘNG 7: THÊM 2 ROUTE MỚI ---

// PUT (Cập nhật 1 user theo ID)
// :id là một tham số động, ví dụ: /users/60f8f8f8f8f8f8f8f8f8
router.put('/:id', userController.updateUser);

// DELETE (Xóa 1 user theo ID)
router.delete('/:id', userController.deleteUser);
// ------------------------------------

module.exports = router;