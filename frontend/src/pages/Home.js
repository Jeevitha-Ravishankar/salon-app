import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './salon_bg.jpg';

const Home = () => {
  return (
    <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
      <h1 style={styles.title}>
        <span style={styles.titleInner}>💇‍♀️ Welcome to Salon Supreme 💇‍♂️</span>
      </h1>
      <p style={styles.subtitle}>
        Please <Link style={styles.link} to="/login">Login</Link> or <Link style={styles.link} to="/register">Register</Link> to book an appointment.
      </p>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    color: '#fff',
    padding: '0 20px',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  titleInner: {
    display: 'inline-block',
    padding: '1rem 2rem',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.2)',
    animation: 'fadeIn 1.5s ease, float 3s ease-in-out infinite',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.5',
    color: '#f1f1f1',
    position: 'relative',
    zIndex: 1,
    padding: '1rem',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '8px',
    backdropFilter: 'blur(3px)',
    border: '1px solid rgba(255,255,255,0.1)',
    animation: 'fadeIn 2s ease',
  },
  link: {
    color: '#ffb6c1',
    fontWeight: '600',
    textDecoration: 'none',
    position: 'relative',
    padding: '0.2rem 0.5rem',
    transition: 'all 0.3s ease',
    textShadow: '0 0 5px rgba(255,182,193,0.5)',
    borderRadius: '4px',
  },
  linkHover: {
    background: 'rgba(255,182,193,0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(255,182,193,0.3)',
  },
};

// Add these global styles for animations
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  a:hover {
    background: rgba(255,182,193,0.2);
    transform: translateY(-2px);
    boxShadow: 0 4px 8px rgba(255,182,193,0.3);
  }
`;
document.head.appendChild(styleElement);

export default Home;