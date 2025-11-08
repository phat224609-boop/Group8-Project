// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Dùng IP của Phat
const API_URL = 'http://192.168.1.11:3000/api/auth/signup';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State cho thông báo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset thông báo

    if (!name || !email || !password) {
      setMessage('Vui long nhap day du thong tin');
      return;
    }

    try {
      const response = await axios.post(API_URL, { name, email, password });
      setMessage(`Dang ky thanh cong cho: ${response.data.data.name}`);
      // Xóa form
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Bắt lỗi email trùng
      if (error.response && error.response.status === 400) {
        setMessage('Email nay da ton tai!');
      } else {
        setMessage('Da co loi xay ra, vui long thu lai.');
      }
      console.error('Loi khi dang ky!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h3>Form Dang Ky (Signup)</h3>
      <div>
        <label>Ten: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Mat khau: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Dang Ky</button>
      
      {/* Hiển thị thông báo kết quả */}
      {message && <p>{message}</p>}
    </form>
  );
}

export default Signup;