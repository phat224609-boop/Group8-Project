// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/auth/forgot-password';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post(API_URL, { email });
      setMessage(response.data.message + '. Token da xuat hien o console backend.');
    } catch (error) {
      setError(error.response?.data?.message || 'Lỗi: Email không tồn tại');
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h3>Quên Mật Khẩu</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Gửi Yêu Cầu</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
export default ForgotPassword;