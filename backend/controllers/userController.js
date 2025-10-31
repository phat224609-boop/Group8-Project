/* --- File: backend/controllers/userController.js --- */

// Import model User (Vi đã tạo ở models/User.js)
const User = require('../models/user');

// --- 1. Cập nhật GET /users (dùng async/await) ---
const getAllUsers = async (req, res) => {
  try {
    // Dùng 'User.find()' để lấy tất cả user từ MongoDB
    const users = await User.find();

    res.status(200).json({
      message: 'Lay danh sach users thanh cong!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. Cập nhật POST /users (dùng async/await) ---
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // (Logic cải tiến) Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }

    // Dùng 'User.create()' để tạo một document mới trong MongoDB
    const newUser = await User.create({
      name: name,
      email: email,
    });

    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xuất các hàm đã cập nhật
module.exports = {
  getAllUsers,
  createUser,
};