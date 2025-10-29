/* --- File: backend/server.js --- */

// --- 1. IMPORT CAC THU VIEN ---
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Thu vien ket noi MongoDB

// Import file route
const userRoutes = require('./routes/user.js');

// --- 2. CAU HINH APP ---
// Lenh nay phai o tren cung de doc file .env
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Cho phep React goi API
app.use(express.json()); // De doc duoc JSON tu body

// Lay Port tu file .env
const PORT = process.env.PORT || 3000;

// --- 3. DINH NGHIA ROUTES ---
// Route kiem tra server
app.get('/', (req, res) => {
  res.send('Backend server dang chay!');
});

// Route cho Users
app.use('/users', userRoutes);

// --- 4. KET NOI DATABASE & KHOI DONG SERVER ---

// Lay chuoi ket noi tu file .env
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // --- DAY LA DONG BAN BI THIEU ---
    console.log('Da ket noi thanh cong voi MongoDB Atlas!');

    // Chi khoi dong server (app.listen)
    // SAU KHI ket noi database thanh cong
    app.listen(PORT, () => {
      console.log(`Server dang chay tai http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // Neu ket noi that bai, log loi
    console.error('Loi khi ket noi MongoDB:', err);
    process.exit(1); // Thoat app neu khong ket noi duoc DB
  });

/* LUU Y: Khong con lenh app.listen() o duoi cung nua,
  vi chung ta da chuyen no vao ben trong .then() o tren.
*/