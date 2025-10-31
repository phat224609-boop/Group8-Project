// backend/controllers/userController.js
const User = require('../models/User');
const { router } = require('../routes/user');

// --- CÁC HÀM CŨ (getAllUsers, createUser) GIỮ NGUYÊN ---
const getAllUsers = async (req, res) => {
  // ... (code cũ của Vi, giữ nguyên)
};

const createUser = async (req, res) => {
  // ... (code cũ của Vi, giữ nguyên)
};



// PUT: Sửa user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL
    const { name, email } = req.body; // Lấy thông tin mới từ body

    // Tìm và cập nhật user trong MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name: name, email: email },
      { new: true } // {new: true} để trả về user sau khi đã cập nhật
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

// DELETE: Xóa user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL

    // Tìm và xóa user trong MongoDB
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

// --- CẬP NHẬT MODULE.EXPORTS ---
// (Thêm updateUser và deleteUser vào)
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
// ------------------------------------
module.exports = router;
