// models/User.js
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
      unique: true, // Đảm bảo email không bị trùng
    },
  },
  { timestamps: true } // Tự động thêm 'createdAt' và 'updatedAt'
);

// Xuất model để controller có thể dùng
module.exports = mongoose.model('User', UserSchema);