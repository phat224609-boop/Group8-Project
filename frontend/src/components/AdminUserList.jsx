// src/components/AdminUserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dùng IP của Phat
const API_URL_USERS = 'http://192.168.1.11:3000/users';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Hàm load tất cả user (chỉ Admin mới gọi được)
  const fetchAllUsers = async () => {
    setMessage('');
    try {
      // Lấy token để xác thực
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(API_URL_USERS, config);
      setUsers(response.data.data);

    } catch (error) {
      console.error('Loi khi lay danh sach users!', error);
      setMessage('Lỗi: Bạn không có quyền Admin hoặc Token hết hạn.');
    }
  };

  // Tự động gọi khi component được tải
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Hàm Xóa (chỉ Admin mới gọi được)
  const handleDeleteUser = async (id) => {
    if (window.confirm('Ban co chac chan muon xoa USER nay?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`${API_URL_USERS}/${id}`, config);
        
        // Tải lại danh sách sau khi xóa
        fetchAllUsers();

      } catch (error) {
        console.error('Loi khi xoa user!', error);
        setMessage('Lỗi khi xóa user.');
      }
    }
  };

  return (
  // ---- CSS THAY ĐỔI Ở ĐÂY ----
    <div style={{ 
      border: '2px solid red', 
      padding: '15px', 
      borderRadius: '5px', 
      marginTop: '20px', 
      width: '90%' // Thêm width để căn giữa
    }}>
      <h2>Trang Admin: Quan Ly Users</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.length === 0 ? (
          <p>Khong co user nao...</p>
        ) : (
          users.map(user => (
            // ---- CSS THAY ĐỔI Ở ĐÂY ----
            <li key={user._id} style={{ 
              margin: '10px 0', // Sửa margin
              backgroundColor: '#555', // Đổi nền thành xám sáng hơn
              color: 'white', // Đổi chữ thành màu trắng
              padding: '10px', // Tăng padding
              borderRadius: '5px', // Bo góc
              display: 'flex', // Dùng flexbox
              justifyContent: 'space-between', // Đẩy nút Xóa sang phải
              alignItems: 'center' // Căn giữa
            }}>
              {/* Thông tin user (bên trái) */}
              <div>
                <strong>{user.name}</strong> ({user.email})
                <br/>
                <small>ID: {user._id} | Role: {user.role}</small>
              </div>
              
              {/* Nút Xóa (bên phải) */}
              <button 
                onClick={() => handleDeleteUser(user._id)} 
                style={{ 
                  backgroundColor: 'darkred', 
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}>
                Xóa
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}



export default AdminUserList;