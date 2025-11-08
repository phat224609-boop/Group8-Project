// src/App.js
import React, { useState, useEffect } from 'react'; // <-- THÊM LẠI useState
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminUserList from './components/AdminUserList';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';

const API_URL_AUTH = 'http://192.168.1.11:3000/api/auth';

function App() {

  // --- SỬA LỖI Ở ĐÂY ---
  // 1. Dùng State cho role, đọc giá trị ban đầu từ localStorage
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  // --------------------

  // 2. Hàm mới để Login.jsx gọi
  const handleLoginSuccess = (userRole) => {
    setRole(userRole); // Cập nhật state ngay lập tức
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); 
    
    setRole(null); // <-- 3. Cập nhật state khi logout
    
    delete axios.defaults.headers.common['Authorization'];
    axios.post(`${API_URL_AUTH}/logout`);
    alert('Da dang xuat!');
    // Xóa window.location.reload();
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

        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px', flexWrap: 'wrap'}}>
          <Signup />
          
          {/* 4. Truyền hàm mới vào Login.jsx */}
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        
        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px', flexWrap: 'wrap'}}>
          <ForgotPassword />
          <ResetPassword />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        <Profile />
        <hr style={{width: '90%', margin: '20px 0'}}/>

        {/* 5. Logic render bây giờ dùng State 'role' */}
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