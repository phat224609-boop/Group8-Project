// controllers/userController.js

// Mảng tạm thời để lưu trữ users (Fake Database)
let users = [
  { id: 1, name: 'Phat (Backend)', email: 'phat@example.com' },
  { id: 2, name: 'Thu (Frontend)', email: 'thu@example.com' },
  { id: 3, name: 'Vi (Database)', email: 'vi@example.com' },
];

// Logic 1: Lấy tất cả users (GET /users)
const getAllUsers = (req, res) => {
  try {
    res.status(200).json({
      message: 'Lay danh sach users thanh cong!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logic 2: Tạo user mới (POST /users)
const createUser = (req, res) => {
  try {
    // Lấy data từ body
    const { name, email } = req.body;

    // (Thường thì database sẽ tự tạo ID, ở đây chúng ta fake)
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      name: name,
      email: email,
    };

    // Thêm user mới vào mảng
    users.push(newUser);

    res.status(201).json({
      message: 'Tao user moi thanh cong!',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xuất các hàm này ra để file route có thể dùng
module.exports = {
  getAllUsers,
  createUser,
};