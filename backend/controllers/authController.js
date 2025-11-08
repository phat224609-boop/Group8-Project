// backend/controllers/authController.js
const User = require('../models/User'); // Đảm bảo tên file là 'User.js' (U hoa)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Cần cho reset password

// --- (Hàm cũ) SIGNUP ---
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- (Hàm cũ) LOGIN ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'Email khong ton tai' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mat khau' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Dòng này lấy role và trả về
    const { password: userPassword, ...userInfo } = user._doc;
    res.status(200).json({
      message: 'Dang nhap thanh cong!',
      token: token,
      data: userInfo, // <-- ĐÂY LÀ DÒNG TRẢ VỀ ROLE
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- (Hàm cũ) LOGOUT ---
const logout = (req, res) => {
  res.status(200).json({ message: 'Da dang xuat (API response)' });
};


// --- HOẠT ĐỘNG MỚI: FORGOT PASSWORD ---
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'Email khong ton tai' });
    }

    // 1. Tạo token (gọi hàm trong User.js)
    const resetToken = user.getResetPasswordToken();
    
    // 2. Lưu token (đã hash) vào DB
    await user.save({ validateBeforeSave: false }); // Bỏ qua validation

    // --- 3. "GỬI EMAIL" (Giả lập) ---
    console.log('--- RESET TOKEN ---');
    console.log('(Gia lap email) Gui token nay cho user: ', resetToken);
    console.log('-------------------');
    // (Kết thúc giả lập)

    res.status(200).json({ 
      message: 'Da gui token reset (kiem tra console backend)' 
    });

  } catch (error) {
    // Nếu lỗi, xóa token đã lưu
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }
    res.status(500).json({ message: error.message });
  }
};

// --- HOẠT ĐỘNG MỚI: RESET PASSWORD ---
const resetPassword = async (req, res) => {
  try {
    // Lấy token từ URL
    const token = req.params.token;
    
    // 1. Hash token nhận được (để so sánh với DB)
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // 2. Tìm user bằng token VÀ token chưa hết hạn
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // $gt: (lớn hơn) thời gian hiện tại
    });

    if (!user) {
      return res.status(400).json({ message: 'Token khong hop le hoac het han' });
    }

    // 3. Đặt mật khẩu mới (và mã hóa)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    // 4. Xóa token reset
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save(); // .save() sẽ tự động chạy validation

    res.status(200).json({ message: 'Da doi mat khau thanh cong' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  signup,
  login,
  logout,
  forgotPassword, // <-- Thêm mới
  resetPassword, // <-- Thêm mới
};