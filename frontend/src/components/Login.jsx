// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Dùng IP của Phat
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
      
      // --- LƯU TOKEN ---
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // (Nâng cao) Tự động đính kèm token vào mọi request axios sau này
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setMessage(`Dang nhap thanh cong! Token: ${token}`);
      
      // Tùy chọn: Chuyển hướng đến trang chính
      // window.location.href = '/'; 
      
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
      
      {/* Hiển thị thông báo (bao gồm cả token) */}
      {message && <p style={{ wordBreak: 'break-all' }}>{message}</p>}
    </form>
  );
}

export default Login;