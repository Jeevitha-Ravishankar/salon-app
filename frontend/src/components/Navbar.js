import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '10px', textAlign: 'right' }}>
      <button onClick={handleLogout} style={{ background: '#8b572a', color: 'white' }}>Logout</button>
    </div>
  );
};

export default Navbar;
