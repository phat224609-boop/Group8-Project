// src/App.js
import React, { useState } from 'react';// Bật lại useState
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminUserList from './components/AdminUserList';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';

// Định nghĩa 1 lần và dùng chung
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  // Dùng State cho role, đọc giá trị ban đầu từ localStorage
  const [role, setRole] = useState(localStorage.getItem('userRole'));

  // Hàm này để Login.jsx gọi lên
  const handleLoginSuccess = (userRole) => {
    setRole(userRole); // Cập nhật state ngay lập tức
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); 
    setRole(null); // Cập nhật state khi logout
    delete axios.defaults.headers.common['Authorization'];
    
    // Gọi API Logout (nếu cần)
    if (API_URL) {
      axios.post(`${API_URL}/api/auth/logout`);
    }
    
    alert('Da dang xuat!');
  };

  return (
    <div className="App">
      <header className="App-header" style={{ alignItems: 'center' }}>
        <h1>Du an Group8 - (Frontend React)</h1>

        <button 
          onClick={handleLogout} 
          style={{backgroundColor: 'red', color: 'white', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>
          Dang Xuat (Logout)
        </button>

        {/* --- KHU VỰC ĐĂNG NHẬP/KÝ --- */}
        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px', flexWrap: 'wrap'}}>
          <Signup />
          
          {/* Truyền hàm mới vào Login.jsx */}
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        
        {/* --- KHU VỰC QUÊN MẬT KHẨU --- */}
        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px', flexWrap: 'wrap'}}>
          <ForgotPassword />
          <ResetPassword />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        
        {/* --- KHU VỰC PROFILE (HIỂN THỊ CHO TẤT CẢ) --- */}
        <Profile />
        <hr style={{width: '90%', margin: '20px 0'}}/>

        {/* --- KHU VỰC ADMIN --- */}
        {role === 'admin' ? (
          <AdminUserList />
        ) : (
          <p>Ban la User thuong, khong co quyen xem danh sach users.</p>
        )}

      </header>
    </div>
  );
}

export default App;