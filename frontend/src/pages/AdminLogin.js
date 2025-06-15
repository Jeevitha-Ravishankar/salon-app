import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'jeevitha.r2023@vitstudent.ac.in';
  const ADMIN_PASSWORD = 'Jeevitha';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '3rem auto',
        padding: '2rem',
        border: '1px solid #7B4F24',  // brown border
        borderRadius: 8,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#FAF0E6',  // light beige background
        color: '#5C3A21'              // dark brown text
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#7B4F24' /* medium brown title */ }}>
        Admin Login
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 8,
            marginBottom: '1rem',
            boxSizing: 'border-box',
            border: '1.5px solid #7B4F24',
            borderRadius: 4,
            color: '#5C3A21',
            backgroundColor: '#FFF8F0',
          }}
        />

        <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 8,
            marginBottom: '1rem',
            boxSizing: 'border-box',
            border: '1.5px solid #7B4F24',
            borderRadius: 4,
            color: '#5C3A21',
            backgroundColor: '#FFF8F0',
          }}
        />

        {error && (
          <p style={{ color: '#A52A2A', marginBottom: '1rem', fontWeight: 'bold' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#7B4F24',
            color: '#FFF8F0',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#A0522D')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#7B4F24')}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
