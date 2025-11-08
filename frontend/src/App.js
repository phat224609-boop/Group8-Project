
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import Signup from './components/Signup'; // <-- IMPORT MỚI
import Login from './components/Login';   // <-- IMPORT MỚI
import Profile from './components/Profile';
import './App.css';

// --- DÙNG IP CỦA PHAT ---
const API_URL_USERS = 'http://192.168.1.11:3000/users';
const API_URL_AUTH = 'http://192.168.1.11:3000/api/auth';

function App() {
  const [users, setUsers] = useState([]);

  // --- LOGIC CŨ (GET, PUT, DELETE) ---
  const fetchUsers = () => {
    axios.get(API_URL_USERS)
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Loi khi lay danh sach users!', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Ban co chac chan muon xoa?')) {
      try {
        await axios.delete(`${API_URL_USERS}/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Loi khi xoa user!', error);
      }
    }
  };

  const handleEdit = async (user) => {
    const newName = prompt('Nhap ten moi cho user:', user.name);
    if (newName && newName !== user.name) {
      try {
        await axios.put(`${API_URL_USERS}/${user._id}`, {
          name: newName,
          email: user.email
        });
        fetchUsers();
      } catch (error) {
        console.error('Loi khi cap nhat user!', error);
      }
    }
  };

  // --- LOGIC MỚI (LOGOUT) ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    axios.post(`${API_URL_AUTH}/logout`); // Gọi API Logout
    alert('Da dang xuat!');
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Du an Group8 - (Frontend React)</h1>

        {/* --- NÚT LOGOUT MỚI --- */}
        <button 
          onClick={handleLogout} 
          style={{backgroundColor: 'red', color: 'white', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px'}}>
          Dang Xuat (Logout)
        </button>

        {/* --- FORM MỚI (SIGNUP/LOGIN) --- */}
        <div style={{display: 'flex', justifyContent: 'space-around', width: '90%', gap: '20px'}}>
          <Signup />
          <Login />
        </div>
        
        <hr style={{width: '90%', margin: '20px 0'}}/>
        <Profile />

        {/* --- KHU VỰC CŨ (QUẢN LÝ USER) --- */}
        <UserList
          users={users}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

      </header>
    </div>
  );
}

export default App;