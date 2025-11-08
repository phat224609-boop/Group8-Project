// backend/controllers/userController.js
const User = require('../models/User');

// ... (code cũ: getAllUsers, createUser, updateUser, deleteUser) ...
const getAllUsers = async (req, res) => { /* ... code cũ ... */ };
const createUser = async (req, res) => { /* ... code cũ ... */ };
const updateUser = async (req, res) => { /* ... code cũ ... */ };
const deleteUser = async (req, res) => { /* ... code cũ ... */ };
const getUserProfile = async (req, res) => { /* ... code cũ ... */ };
const updateUserProfile = async (req, res) => { /* ... code cũ ... */ };


// --- HOẠT ĐỘNG MỚI: UPLOAD AVATAR ---
const uploadAvatar = async (req, res) => {
  try {
    // 1. Kiểm tra xem file đã được upload chưa
    // (Middleware 'upload' đã chạy và xử lý file)
    if (!req.file) {
      return res.status(400).json({ message: 'Vui long chon 1 file anh' });
    }

    // 2. Lấy URL của ảnh từ Cloudinary
    // (req.file.path là URL do multer-storage-cloudinary cung cấp)
    const avatarUrl = req.file.path;

    // 3. Tìm user (đã đăng nhập) và cập nhật DB
    const user = await User.findByIdAndUpdate(
      req.user._id, // Lấy ID từ middleware 'protect'
      { avatar: avatarUrl }, // Cập nhật trường 'avatar'
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Cap nhat avatar thanh cong!',
      data: user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// --- CẬP NHẬT MODULE.EXPORTS ---
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  uploadAvatar, // <-- Thêm mới
};