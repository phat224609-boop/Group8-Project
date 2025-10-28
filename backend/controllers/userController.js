// D:\...Tnhóm-thu-vi-phat\Group8-Project (backend)\controllers\userController.js

// 2. Tạo mảng tạm users
// ==> PHẢI ĐẶT Ở ĐÂY (BÊN NGOÀI HÀM)
let users = [
    { id: 1, name: 'phat', email: 'phat@example.com' },
    { id: 2, name: 'thu', email: 'thu@example.com' },
    { id: 3, name: 'vi', email: 'vi@example.com' }
];

// 3. Viết API: GET /users
exports.getAllUsers = (req, res) => {
    try {
        // Hàm này sẽ lấy mảng 'users' đã định nghĩa ở trên
        res.status(200).json({
            status: 'success',
            results: users.length, // Sẽ là 3
            data: {
                users // Gửi mảng users về
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Lỗi máy chủ'
        });
    }
};

// 3. Viết API: POST /users
exports.createUser = (req, res) => {
    // ... (Code của hàm POST ở đây)
    // KHÔNG đặt 'let users = [...]' ở đây
    
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                status: 'fail',
                message: 'Vui lòng cung cấp tên (name) và email'
            });
        }
        
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = { id: newId, name, email };

        // Hàm này cũng dùng mảng 'users' ở trên và push vào
        users.push(newUser); 

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Lỗi máy chủ'
        });
    }
};