// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css'; // File CSS mặc định (không cần xóa)

function App() {
  const [users, setUsers] = useState([]);

  // Hàm để load danh sách users
  const fetchUsers = () => {
    // Gọi API GET
    axios.get('http://localhost:3000/users')
      .then(response => {
        // Cập nhật state với data từ API
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Loi khi lay danh sach users!', error);
      });
  };

  // useEffect sẽ chạy 1 lần khi component được render
  // de goi API va lay danh sach users ban dau
  useEffect(() => {
    fetchUsers();
  }, []); // Dấu [] nghĩa là chỉ chạy 1 lần

  return (
    <div className="App">
      <header className="App-header">
        <h1>Du an Group8 - (Frontend React)</h1>
        
        {/* Component Them User */}
        <AddUser onUserAdded={fetchUsers} />

        {/* Component Danh Sach User */}
        <UserList users={users} />

      </header>
    </div>
  );
}

export default App;