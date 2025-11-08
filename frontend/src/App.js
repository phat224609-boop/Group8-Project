// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
// import AddUser from './components/AddUser'; // (Đã xóa ở hoạt động trước)
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminUserList from './components/AdminUserList'; // <-- 1. IMPORT MỚI

// --- DÙNG IP CỦA PHAT ---
const API_URL_USERS = 'http://192.168.1.12:3000/users';
const API_URL_AUTH = 'http://192.168.1.12:3000/api/auth';

// --- ĐỌC ROLE TỪ LOCALSTORAGE (HOẠT ĐỘNG 3) ---
const userRole = localStorage.getItem('userRole');
// ---------------------------------------------

function App() {
  const [users, setUsers] = useState([]);

  // --- LOGIC CŨ (GET, PUT, DELETE) ---
  const fetchUsers = () => {
    // API này bây giờ đã bị khóa, chỉ Admin mới gọi được
    // (Chúng ta sẽ để nó lỗi 403 nếu user thường cố load)
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    axios.get(API_URL_USERS, config)
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Loi khi lay danh sach users (UserList)!', error.response.data.message);
      });
  };

  useEffect(() => {
    if (userRole === 'admin') { // Chỉ load UserList nếu là admin
        fetchUsers();
    }
  }, []);

  const handleDelete = async (id) => {
    // ... (logic cũ)
  };

  const handleEdit = async (user) => {
    // ... (logic cũ)
  };

  // --- LOGIC MỚI (LOGOUT) ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // <-- PHẢI XÓA CẢ ROLE
    delete axios.defaults.headers.common['Authorization'];
    axios.post(`${API_URL_AUTH}/logout`);
    alert('Da dang xuat!');
    window.location.reload();
  };

  return (
    <div className="App">
      {/* --- CSS THAY ĐỔI Ở ĐÂY --- */}
      {/* Chúng ta thêm align-items: center vào App-header */}
      <header className="App-header" style={{ alignItems: 'center' }}>
        <h1>Du an Group8 - (Frontend React)</h1>

        <button 
          onClick={handleLogout} 
          style={{backgroundColor: 'red', color: 'white', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>
          Dang Xuat (Logout)
        </button>

        {/* --- Dùng width: '90%' và flex-wrap --- */}
        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px', flexWrap: 'wrap'}}>
          <Signup />
          <Login />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        <Profile />
        <hr style={{width: '90%', margin: '20px 0'}}/>

        {/* --- KHU VỰC HIỂN THỊ CÓ ĐIỀU KIỆN --- */}
        {userRole === 'admin' ? (
          // 1. Nếu là Admin: Hiển thị trang Admin (đã được CSS)
          <AdminUserList />
        ) : (
          // 2. Nếu là user thường: Hiển thị UserList cũ
          // (UserList cũ giờ sẽ ẩn đi, hoặc bạn có thể xóa nó)
          <p>Ban la User thuong, khong co quyen xem danh sach users.</p>
          
          /*
          <UserList
            users={users}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          */
        )}

      </header>
    </div>
  );
}

export default App;