import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import formStyles from './styles.js'; // Adjust path if needed

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          required
          style={formStyles.input}
        />
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
          minLength={6}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
