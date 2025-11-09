// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/auth/login';

// NHẬN PROP MỚI: onLoginSuccess
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(API_URL, { email, password });
      const token = response.data.token;
      
      // --- SỬA LỖI CASE SENSITIVE (CHỮ HOA/THƯỜNG) ---
      const rawRole = response.data.data.role; 

      if (!rawRole) {
        setMessage('Lỗi: Backend không trả về userRole!');
        return;
      }
      
      // 2. CHUẨN HÓA VỀ CHỮ THƯỜNG
      const finalRole = rawRole.toLowerCase(); 
      
      // 3. Lưu (đã chuẩn hóa) vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', finalRole);
      
      // 4. Báo cho App.js (đã chuẩn hóa)
      onLoginSuccess(finalRole);
      // ---------------------------------------------
      
      setMessage(`Dang nhap thanh cong! Role: ${finalRole}`);
      
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        setMessage('Email hoac mat khau khong chinh xac!');
      } else {
        setMessage('Loi ket noi! (Backend co the da sap)');
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
      
      {message && <p style={{ color: 'red', wordBreak: 'break-all' }}>{message}</p>}
    </form>
  );
}

export default Login;