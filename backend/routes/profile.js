// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import middleware

// Định nghĩa 2 route mới
// Khi gọi GET / , hàm 'protect' sẽ chạy trước, sau đó mới đến 'getUserProfile'
router.get('/', protect, getUserProfile);
router.put('/', protect, updateUserProfile);

module.exports = router;