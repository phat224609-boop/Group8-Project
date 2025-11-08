// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Lấy token từ header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token (bỏ chữ "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 2. Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Lấy thông tin user từ ID trong token
      // Gắn user vào request (trừ mật khẩu)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Đi tiếp đến API
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token không hợp lệ' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không có token, không có quyền truy cập' });
  }
};

module.exports = { protect };