// backend/models/User.js
const mongoose = require('mongoose');
const crypto = require('crypto'); // Thư viện (có sẵn) để tạo token

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    resetPasswordToken: String, // Lưu token reset
    resetPasswordExpire: Date, // Thời gian token hết hạn
  },
  { timestamps: true }
);

// --- HÀM TẠO TOKEN RESET ---
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút
  return resetToken; // Trả về token gốc (chưa hash)
};

module.exports = mongoose.model('User', UserSchema);