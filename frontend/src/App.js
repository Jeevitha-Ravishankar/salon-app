import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentForm from './components/AppointmentForm';
import AdminLogin from './pages/AdminLogin';
import FeedbackPage from './pages/FeedbackPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />  {/* Optional if you want to keep /auth */}
        <Route path="/book" element={<AppointmentForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
