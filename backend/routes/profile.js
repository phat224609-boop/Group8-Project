// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  uploadAvatar, // <-- Import hàm mới
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary'); // <-- Import middleware Upload

// GET /api/profile
router.get('/', protect, getUserProfile);

// PUT /api/profile
router.put('/', protect, updateUserProfile);

// PUT /api/profile/upload-avatar
router.put(
  '/upload-avatar', 
  protect, 
  upload.single('avatar'), // 'avatar' là tên trường (field)
  uploadAvatar
);

module.exports = router;