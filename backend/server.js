const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// --- BƯỚC 1: IMPORT USER ROUTE ---
const userRoutes = require('./routes/user.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Route cơ bản để kiểm tra
app.get('/', (req, res) => {
  res.send('Backend server dang chay!');
});

// --- BƯỚC 2: SỬ DỤNG USER ROUTE ---
// Bất kỳ request nào bắt đầu bằng /users sẽ được chuyển đến userRoutes
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});