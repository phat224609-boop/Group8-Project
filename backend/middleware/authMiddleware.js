// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// HÀM CŨ: (Kiểm tra xem user đã đăng nhập chưa)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token không hợp lệ' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không có token, không có quyền truy cập' });
  }
};

// --- HÀM MỚI (HOẠT ĐỘNG 3) ---
// (Kiểm tra xem user có phải là Admin không)
const admin = (req, res, next) => {
  // Hàm này phải chạy SAU hàm 'protect', nên chúng ta đã có req.user
  if (req.user && req.user.role === 'admin') {
    next(); // Là admin, cho đi tiếp
  } else {
    res.status(403).json({ message: 'Không có quyền Admin' });
  }
};
// ---------------------------------

module.exports = { protect, admin }; // Xuất ra cả 2 hàm