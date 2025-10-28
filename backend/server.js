// Đây là file app.js (file server chính)

// 1. Import các thư viện cần thiết
const express = require('express');
const app = express(); // Tạo một ứng dụng express

// 2. Import router của bạn
const userRouter = require('./routes/user');

// 3. MIDDLEWARE: Rất quan trọng
// Dòng này giúp server đọc được JSON từ body của request (cho POST)
app.use(express.json());

// 4. ROUTING:
// Báo cho server biết: 
// Bất kỳ request nào có đường dẫn bắt đầu bằng '/api/v1/users'
// thì sẽ được xử lý bởi 'userRouter' (file routes/user.js của bạn)
app.use('/api/v1/users', userRouter);

// 5. KHỞI ĐỘNG SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Ứng dụng đang chạy trên cổng ${port}...`);
    console.log('Bây giờ bạn có thể mở Postman để test!');
});