/* --- File: backend/server.js (Bản sửa lỗi thứ tự) --- */

// --- 1. ĐỌC FILE .ENV NGAY LẬP TỨC ---
// (Phải nằm ở dòng đầu tiên)
const dotenv = require('dotenv');
dotenv.config();

// --- 2. IMPORT CÁC THƯ VIỆN ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

// --- 3. IMPORT CÁC ROUTE ---
// (Các file này bây giờ đã có thể đọc process.env)
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const profileRoutes = require('./routes/profile.js');

// --- 4. CẤU HÌNH APP ---
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- 5. ĐỊNH NGHĨA ROUTES ---
app.get('/', (req, res) => {
  res.send('Backend server dang chay!');
});
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// --- 6. KẾT NỐI DATABASE & KHỞI ĐỘNG SERVER ---
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Da ket noi thanh cong voi MongoDB Atlas!');
    app.listen(PORT, () => {
      console.log(`Server dang chay tai http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Loi khi ket noi MongoDB:', err);
    process.exit(1);
  });