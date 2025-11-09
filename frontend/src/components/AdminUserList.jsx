// src/components/AdminUserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL_USERS = process.env.REACT_APP_API_URL + '/users';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Hàm load tất cả user (chỉ Admin mới gọi được)
  const fetchAllUsers = async () => {
    setMessage('');
    try {
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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Hàm Xóa
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
        fetchAllUsers(); // Tải lại danh sách
      } catch (error) {
        console.error('Loi khi xoa user!', error);
        setMessage('Lỗi khi xóa user.');
      }
    }
  };

  return (
    <div style={{ 
      border: '2px solid red', 
      padding: '15px', 
      borderRadius: '5px', 
      marginTop: '20px', 
      width: '90%'
    }}>
      <h2>Trang Admin: Quan Ly Users</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.length === 0 ? (
          <p>Khong co user nao...</p>
        ) : (
          users.map(user => (
            <li key={user._id} style={{ 
              margin: '10px 0', 
              backgroundColor: '#555', // Nền xám sáng
              color: 'white', // Chữ trắng
              padding: '10px', 
              borderRadius: '5px',
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
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
