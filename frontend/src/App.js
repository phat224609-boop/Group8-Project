// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css';

// --- QUAN TRỌNG: DÙNG IP CỦA PHAT ---
const API_URL = 'http://192.168.1.12:3000/users';

function App() {
  const [users, setUsers] = useState([]);

  // Hàm load user (giữ nguyên)
  const fetchUsers = () => {
    axios.get(API_URL) // <-- Đã sửa IP
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Loi khi lay danh sach users!', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- HOẠT ĐỘNG 7: THÊM LOGIC DELETE ---
  const handleDelete = async (id) => {
    // Hỏi xác nhận
    if (window.confirm('Ban co chac chan muon xoa?')) {
      try {
        await axios.delete(`${API_URL}/${id}`); // <-- Đã sửa IP
        // Sau khi xóa thành công, gọi fetchUsers để load lại list
        fetchUsers();
      } catch (error) {
        console.error('Loi khi xoa user!', error);
      }
    }
  };

  // --- HOẠT ĐỘNG 7: THÊM LOGIC EDIT ---
  const handleEdit = async (user) => {
    const newName = prompt('Nhap ten moi cho user:', user.name);

    if (newName && newName !== user.name) {
      try {
        // Gửi request PUT (chỉ cập nhật tên)
        await axios.put(`${API_URL}/${user._id}`, { // <-- Đã sửa IP
          name: newName,
          email: user.email // Giữ email cũ
        });
        // Load lại danh sách
        fetchUsers();
      } catch (error) {
        console.error('Loi khi cap nhat user!', error);
      }
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Du an Group8 - (Frontend React)</h1>
        
        {/* Component Them User (Hoạt động 8) */}
        <AddUser onUserAdded={fetchUsers} />

        {/* Component Danh Sach User (Hoạt động 7) */}
        {/* Truyền 2 hàm mới xuống UserList */}
        <UserList
          users={users}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

      </header>
    </div>
  );
}

export default App;