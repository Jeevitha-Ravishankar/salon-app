import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';

const Auth = () => {
  const location = useLocation();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (location.pathname === '/register') {
      setShowRegister(true);
    } else {
      setShowRegister(false);
    }
  }, [location.pathname]);

  return (
    <div style={styles.container}>
      <div style={styles.toggleContainer}>
        <button
          onClick={() => setShowRegister(false)}
          disabled={!showRegister}
          style={{
            ...styles.toggleButton,
            ...(!showRegister ? styles.activeButton : {}),
          }}
        >
          Login
        </button>
        <button
          onClick={() => setShowRegister(true)}
          disabled={showRegister}
          style={{
            ...styles.toggleButton,
            ...(showRegister ? styles.activeButton : {}),
          }}
        >
          Register
        </button>
      </div>

      <div>{showRegister ? <Register /> : <Login />}</div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '3rem auto',
    padding: '2rem',
    background: 'white',
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(206, 95, 21, 0.87)',
    fontFamily: "'Poppins', sans-serif",
    color: '#8b572a',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  toggleButton: {
    flex: 1,
    padding: '12px 0',
    margin: '0 5px',
    fontSize: '1.1rem',
    borderRadius: 50,
    border: '2px solid #8b572a',
    backgroundColor: 'transparent',
    color: '#8b572a',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
  activeButton: {
    backgroundColor: '#8b572a',
    color: 'white',
    boxShadow: '0 8px 15px rgba(160, 163, 12, 0.3)',
    cursor: 'default',
  },
};

export default Auth;
