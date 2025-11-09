/* --- File: backend/server.js (File chính) --- */

// --- 1. ĐỌC FILE .ENV NGAY LẬP TỨC ---
const dotenv = require('dotenv');
dotenv.config();

// --- 2. IMPORT CÁC THƯ VIỆN ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

// --- 3. IMPORT CÁC ROUTE ---
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const profileRoutes = require('./routes/profile.js');

// --- 4. CẤU HÌNH APP ---
const app = express();

// Cấu hình CORS (cho phép Vercel và localhost)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://group8-project.vercel.app' // Thay bằng link Vercel của bạn
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json()); // Để đọc JSON

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