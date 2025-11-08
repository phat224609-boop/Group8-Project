// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [token, setToken] = useState(''); // <-- Ô để dán token
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token || !password) {
      setError('Vui long nhap token va mat khau moi');
      return;
    }

    const API_URL = `http://192.168.1.11:3000/api/auth/reset-password/${token}`;

    try {
      const response = await axios.put(API_URL, { password });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Lỗi: Token không hợp lệ');
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h3>Đổi Mật Khẩu (Dùng Token)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token (Dán từ console): </label>
          <input 
            type="text" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mật khẩu mới: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Đổi Mật Khẩu</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
export default ResetPassword;