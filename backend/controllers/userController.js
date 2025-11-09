// backend/controllers/userController.js
const User = require('../models/User'); // Dòng này sẽ hết lỗi nếu file 1 đúng

// --- 1. GET ALL (Hoạt động 3 Admin) ---
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

// --- 2. CREATE (Hoạt động 3 Admin) ---
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Thieu thong tin'});
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }
    // (Lưu ý: nên mã hóa password ở đây giống Signup)
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. UPDATE (Hoạt động 7 CRUD) ---
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

// --- 4. DELETE (Hoạt động 7 CRUD) ---
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

// --- 5. GET PROFILE (Hoạt động 2 Profile) ---
const getUserProfile = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- 6. UPDATE PROFILE (Hoạt động 2 Profile) ---
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.body.name && req.body.name.trim() === '') {
      return res.status(400).json({ message: 'Ten không được để trống' });
    }
    
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Email này đã được sử dụng' });
      }
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi cập nhật', error: error.message });
  }
};

// --- 7. UPLOAD AVATAR (Hoạt động 4 Nâng cao) ---
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui long chon 1 file anh' });
    }
    const avatarUrl = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
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

// --- XUẤT RA TẤT CẢ 7 HÀM ---
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
};