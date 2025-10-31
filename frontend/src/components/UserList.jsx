import React from 'react';

// Component này chỉ nhận props 'users' và hiển thị..
function UserList({ users }) {
    return (
        <div style={{ marginTop: '20px', width: '300px' }}>
            <h2>Danh sách User</h2>
            {users.length === 0 ? (
                <p>Chưa có user nào.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                    {/* Dùng .map() để lặp qua mảng users */}
                    {users.map(user => (
                        <li key={user.id || user.email} style={{ background: '#444', padding: '10px', margin: '5px', borderRadius: '5px' }}>
                            <strong>{user.name}</strong>
                            <br />
                            <small>{user.email}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserList;