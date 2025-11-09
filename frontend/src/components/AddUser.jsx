// src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

// --- QUAN TRỌNG: DÙNG IP CỦA PHAT (BACKEND) ---
// Đảm bảo IP này chính xác
const API_URL = 'http://192.168.1.11:3000/users'; 

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // --- HOẠT ĐỘNG 8: Thêm state cho validation ---
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Reset lỗi cũ
    setNameError('');
    setEmailError('');

    // --- HOẠT ĐỘNG 8: Validation logic ---
    let isValid = true;

    // 2. Kiểm tra Tên (Name)
    if (!name.trim()) {
      setNameError('Ten không được để trống');
      isValid = false;
    }

    // 3. Kiểm tra Email (dùng regex)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email không hợp lệ (ví dụ: test@gmail.com)');
      isValid = false;
    }

    // 4. Nếu không hợp lệ, dừng lại
    if (!isValid) {
      return;
    }
    // ------------------------------------

    // 5. Nếu hợp lệ, gọi API
    try {
      const newUser = { name, email };
      await axios.post(API_URL, newUser); // Dùng IP của Phat

      alert('Them user thanh cong!');
      setName('');
      setEmail('');
      onUserAdded(); // Báo App.js load lại list
    } catch (error) {
      console.error('Loi khi them user!', error);
      
      // Bonus: Bắt lỗi email trùng từ backend (Hoạt động 5)
      if (error.response && error.response.status === 400) {
        setEmailError('Email này đã tồn tại!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px' }}>
      <h3>Them User Moi</h3>
      <div>
        <label>Ten: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Hiển thị lỗi Tên */}
        {nameError && <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>{nameError}</p>}
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <label>Email: </label>
        <input
          type="email" // Dùng type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Hiển thị lỗi Email */}
        {emailError && <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>{emailError}</p>}
      </div>
      
      <button type="submit" style={{ marginTop: '15px' }}>Them moi</button>
    </form>
  );
}

export default AddUser;