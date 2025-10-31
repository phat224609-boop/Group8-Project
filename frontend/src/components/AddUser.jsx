// src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Nhận 1 prop 'onUserAdded' để gọi sau khi thêm user thành công
function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Vui long nhap ten va email');
      return;
    }

    const newUser = { name, email };

    // Gọi API POST
    axios.post('http://localhost:3000/users', newUser)
      .then(response => {
        alert('Them user thanh cong!');
        // Reset form
        setName('');
        setEmail('');
        // Báo cho App.js biết để load lại list
        onUserAdded();
      })
      .catch(error => {
        console.error('Loi khi them user!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Them User Moi</h3>
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
      <button type="submit">Them moi</button>
    </form>
  );
}

export default AddUser;