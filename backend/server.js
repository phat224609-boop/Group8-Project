const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Dòng này Phat đã thêm để sửa lỗi CORS

// --- 1. KIỂM TRA DÒNG NÀY ---
// (Bạn phải import file route vào)
const userRoutes = require('./routes/user.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Route cơ bản
app.get('/', (req, res) => {
  res.send('Backend server dang chay!');
});

// --- 2. KIỂM TRA DÒNG NÀY (QUAN TRỌNG NHẤT) ---
// (Dòng này bảo Express sử dụng userRoutes khi có ai đó gọi /users)
// (LỖI 404 LÀ DO BẠN ĐANG THIẾU DÒNG NÀY)
app.use('/users', userRoutes);

// Phải đặt app.use('/users'...) TRƯỚC app.listen
app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});