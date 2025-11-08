// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email không được trùng
    },
    // --- HOẠT ĐỘNG MỚI ---
    password: {
      type: String,
      required: true, // Bắt buộc phải có mật khẩu
      minlength: 6, // Mật khẩu ít nhất 6 ký tự
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Chỉ được là 'user' hoặc 'admin'
      default: 'user', // Mặc định là 'user'
    },
    // --------------------
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);