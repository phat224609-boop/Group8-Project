# Dự án Group8-Project (Quản lý User)

Đây là dự án môn học thực hành nhóm, xây dựng một ứng dụng web full-stack cơ bản (MERN Stack) để quản lý danh sách người dùng, bao gồm các chức năng CRUD (Create, Read, Update, Delete).

## 1. Công nghệ sử dụng

Dự án được xây dựng với các công nghệ hiện đại:

* **Frontend:**
    * **React.js:** Thư viện JavaScript để xây dựng giao diện người dùng.
    * **Axios:** Để gọi API (HTTP request) đến backend.
* **Backend:**
    * **Node.js:** Môi trường chạy JavaScript phía server.
    * **Express.js:** Framework để xây dựng REST API.
    * **CORS:** Middleware để cho phép frontend gọi API.
* **Database:**
    * **MongoDB Atlas:** Dịch vụ database đám mây (NoSQL).
    * **Mongoose:** Thư viện (ODM) để làm việc với MongoDB từ Node.js.
* **Công cụ khác:**
    * **Git & GitHub:** Quản lý phiên bản và làm việc nhóm.
    * **Postman:** Dùng để test API backend.

## 2. Hướng dẫn chạy dự án

Bạn cần cài đặt [Node.js](https://nodejs.org/) (bao gồm npm) và [Git](https://git-scm.com/) trên máy.

**1. Clone Repository:**
```bash
git clone <https://github.com/phat224609-boop/Group8-Project>
cd Group8-Project

# Di chuyển vào thư mục backend
cd backend

# Cài đặt các thư viện
npm install

# Tạo file .env (rất quan trọng)
# Tạo file .env và dán chuỗi MONGO_URI của bạn vào
# MONGO_URI=mongodb+srv://...
touch .env

# Khởi động server (chạy trên http://localhost:3000)
npm start


# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt các thư viện
npm install

# Khởi động app React (chạy trên http://localhost:3001)
npm start

Lưu ý: Nếu chạy trên 2 máy khác nhau, bạn cần thay localhost trong code Frontend (các file .jsx, .js) bằng địa chỉ IP của máy chạy Backend.