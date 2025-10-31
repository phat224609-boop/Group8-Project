/* --- File: backend/controllers/userController.js --- */
const User = require('../models/User');

// --- 1. GET ---
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Lay danh sach users thanh cong!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. POST ---
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }
    const newUser = await User.create({ name, email });
    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. PUT ---
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Cap nhat user thanh cong!',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 4. DELETE ---
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Xoa user thanh cong!',
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- XUẤT RA CẢ 4 HÀM ---
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};