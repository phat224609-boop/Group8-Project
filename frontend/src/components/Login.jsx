// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.1.11:3000/api/auth/login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(API_URL, { email, password });
      
      // --- LƯU TOKEN VÀ ROLE (HOẠT ĐỘNG 3) ---
      const token = response.data.token;
      const userRole = response.data.data.role; // Lấy role từ API

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole); // Lưu role
      // ----------------------------------------
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setMessage(`Dang nhap thanh cong! Role: ${userRole}`);
      
      // Tải lại trang để App.js đọc role mới và hiển thị trang Admin
      window.location.reload(); 
      
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        setMessage('Email hoac mat khau khong chinh xac!');
      } else {
        setMessage('Da co loi xay ra, vui long thu lai.');
      }
      console.error('Loi khi dang nhap!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h3>Form Dang Nhap (Login)</h3>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Mat khau: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Dang Nhap</button>
      
      {message && <p style={{ wordBreak: 'break-all' }}>{message}</p>}
    </form>
  );
}

export default Login;