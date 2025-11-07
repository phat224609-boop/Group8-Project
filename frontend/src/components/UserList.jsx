// src/components/UserList.jsx
import React from 'react';

// Nhận 2 prop mới: handleEdit và handleDelete
function UserList({ users, handleEdit, handleDelete }) {
  return (
    <div>
      <h3>Danh Sach Users</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.length === 0 ? (
          <p>Chua co user nao...</p>
        ) : (
          users.map(user => (
            // Lưu ý: Key phải là user._id (từ MongoDB)
            <li key={user._id} style={{ margin: '10px' }}>
              <strong>{user.name}</strong> ({user.email})
              
              {/* --- ĐÂY LÀ 2 NÚT BỊ MẤT --- */}
              <button 
                onClick={() => handleEdit(user)} 
                style={{ marginLeft: '10px' }}>
                Sửa
              </button>
              
              <button 
                onClick={() => handleDelete(user._id)} 
                style={{ marginLeft: '5px' }}>
                Xóa
              </button>
              {/* ------------------------------- */}

            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UserList;