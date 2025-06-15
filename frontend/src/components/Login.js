import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import formStyles from './styles.js'; // adjust path if needed

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', form.email); // ✅ FIXED
      alert('Login successful!');
      navigate('/book'); // Redirect after login
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
          type="email"
          style={formStyles.input}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
          style={formStyles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            ...formStyles.button,
            ...(loading ? formStyles.buttonDisabled : {}),
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};



export default Login;
