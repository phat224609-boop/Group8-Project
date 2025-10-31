const express = require('express');
const app = express();

// Middleware để đọc JSON từ body của request
app.use(express.json());

// Đọc PORT từ biến môi trường, nếu không có thì dùng 3000
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));