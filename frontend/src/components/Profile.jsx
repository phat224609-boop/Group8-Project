// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dùng IP của Phat
const API_URL_PROFILE = 'http://192.168.1.11:3000/api/profile';
const API_URL_AVATAR = 'http://192.168.1.11:3000/api/profile/upload-avatar';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(''); // <-- State để lưu link avatar
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. Lấy profile (bao gồm avatar) khi tải trang
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Ban chua dang nhap!');
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(API_URL_PROFILE, config);
        
        setName(response.data.name);
        setEmail(response.data.email);
        setAvatar(response.data.avatar); // <-- PHẢI CÓ DÒNG NÀY
        
      } catch (error) {
        console.error('Loi khi lay profile!', error);
        setError('Loi khi tai profile (co the token het han)');
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
      }
    };

    fetchProfile();
  }, []); // [] nghĩa là chỉ chạy 1 lần lúc tải trang

  // 2. Hàm Cập nhật Profile (Tên, Email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation (Hoạt động 2)
    if (!name.trim()) {
      setError('Ten không được để trống');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(API_URL_PROFILE, { name, email }, config);
      
      setMessage('Cap nhat thong tin thanh cong!');
      setName(response.data.name); 

    } catch (error) {
       console.error('Loi khi cap nhat profile!', error);
       if (error.response && error.response.status === 400) {
         setError(error.response.data.message);
       } else {
         setError('Loi khi cap nhat profile');
       }
    }
  };

  // 3. Hàm Upload Avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' phải khớp tên 'upload.single('avatar')'

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(API_URL_AVATAR, formData, config);

      setAvatar(response.data.data.avatar); // <-- CẬP NHẬT STATE AVATAR
      setMessage('Cap nhat avatar thanh cong!');
      setError('');

    } catch (error) {
      console.error('Loi khi upload avatar!', error);
      setError('Loi khi upload avatar');
      setMessage('');
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px', width: '90%' }}>
      <h3>Trang Thông Tin Cá Nhân (Profile)</h3>
      
      {/* --- HIỂN THỊ AVATAR --- */}
      {/* Kiểm tra nếu 'avatar' có tồn tại thì mới hiển thị */}
      {avatar && (
        <img 
          src={avatar} 
          alt="Avatar" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
        />
      )}
      
      {/* --- FORM UPLOAD AVATAR --- */}
      <div style={{ margin: '10px 0' }}>
        <label>Đổi Avatar:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleAvatarUpload} 
        />
      </div>
      
      <hr style={{margin: '15px 0'}}/>

      {/* --- FORM CẬP NHẬT (TÊN, EMAIL) --- */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ten: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Cap Nhat (Ten/Email)</button>
      </form>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Profile;