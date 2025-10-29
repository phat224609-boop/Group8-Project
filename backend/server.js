const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // <-- 1. IMPORT MONGOOSE

const userRoutes = require('./routes/user.js');

dotenv.config(); // Dòng này sẽ đọc file .env
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// <-- 2. KET NOI MONGODB -->
// Lấy chuỗi kết nối từ file .env
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Da ket noi thanh cong voi MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Loi khi ket noi MongoDB:', err);
  });
// <-- KET THUC KET NOI -->

app.get('/', (req, res) => {
  res.send('Backend server dang chay!');
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});