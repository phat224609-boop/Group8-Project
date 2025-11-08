// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- ĐĂNG KÝ (SIGN UP) ---
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10); // "Muối" mã hóa
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
    });

    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- ĐĂNG NHẬP (LOGIN) ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Tìm user theo email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'Email khong ton tai' });
    }

    // 2. So sánh mật khẩu
    // (So sánh mật khẩu gốc user nhập với mật khẩu đã mã hóa trong DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mat khau' });
    }

    // 3. Tạo JWT Token (Nếu mật khẩu khớp)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Thông tin muốn lưu vào token
      process.env.JWT_SECRET, // Mã bí mật
      { expiresIn: '1h' } // Token hết hạn sau 1 giờ
    );
    
    // Bỏ password trước khi trả về
    const { password: userPassword, ...userInfo } = user._doc;

    res.status(200).json({
      message: 'Dang nhap thanh cong!',
      token: token,
      data: userInfo, // Trả về thông tin user (không bao gồm password)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- ĐĂNG XUẤT (LOGOUT) ---
// Logout chủ yếu xử lý ở frontend (xóa token)
// API này chỉ đơn giản là trả về "OK"
const logout = (req, res) => {
  res.status(200).json({ message: 'Da dang xuat (API response)' });
};


module.exports = {
  signup,
  login,
  logout,
};