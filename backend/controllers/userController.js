// controllers/userController.js
const User = require('../models/User'); // Import model

// Mảng tạm thời (Fake Database) đã BỊ XÓA

// Logic 1: Lấy tất cả users (GET /users)
// Chuyển thành hàm async
const getAllUsers = async (req, res) => {
  try {
    // Dùng User.find() để lấy tất cả user từ MongoDB
    const users = await User.find();

    res.status(200).json({
      message: 'Lay danh sach users thanh cong!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logic 2: Tạo user mới (POST /users)
// Chuyển thành hàm async

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }

    // Dùng User.create() để tạo user mới trong MongoDB
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

module.exports = {
  getAllUsers,
  createUser,
};