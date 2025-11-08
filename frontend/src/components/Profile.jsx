// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dùng IP của Phat
const API_URL = 'http://192.168.1.11:3000/api/profile';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Thông báo thành công
  const [error, setError] = useState(''); // Thông báo lỗi

  // 1. Dùng useEffect để lấy profile ngay khi trang được tải
  useEffect(() => {
    const fetchProfile = async () => {
      // Lấy token đã lưu từ localStorage (từ Hoạt động Login)
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Ban chua dang nhap!'); // Dùng setError
        return;
      }

      try {
        // Tạo config để gửi token trong header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gọi API GET /profile (đã được bảo vệ)
        const response = await axios.get(API_URL, config);
        
        // Cập nhật state
        setName(response.data.name);
        setEmail(response.data.email);

      } catch (error) {
        console.error('Loi khi lay profile!', error);
        setError('Loi khi tai profile (co the token het han)');
        // (Nếu lỗi 401, nên xóa token và bắt đăng nhập lại)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
      }
    };

    fetchProfile();
  }, []); // [] nghĩa là chỉ chạy 1 lần lúc tải trang

  // 2. Hàm Cập nhật Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // --- THÊM VALIDATION ---
    if (!name.trim()) {
      setError('Ten không được để trống');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    // ----------------------
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gọi API PUT /profile
      const response = await axios.put(API_URL, { name, email }, config);
      
      setMessage('Cap nhat thong tin thanh cong!');
      setName(response.data.name); // Cập nhật lại tên mới

    } catch (error) {
       console.error('Loi khi cap nhat profile!', error);
       
       // --- BẮT LỖI TỪ PHAT (Backend) ---
       if (error.response && error.response.status === 400) {
         // Hiển thị lỗi 400 (Email trùng, Tên trống)
         setError(error.response.data.message);
       } else {
         // Lỗi chung
         setError('Loi khi cap nhat profile');
       }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>Trang Thông Tin Cá Nhân (Profile)</h3>
      
      <div>
        <label>Ten: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      
      <button type="submit" style={{ marginTop: '10px' }}>Cap Nhat</button>
      
      {/* Hiển thị thông báo (Xanh/Đỏ) */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Profile;
