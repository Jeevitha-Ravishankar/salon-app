const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const { createAdminUser } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    createAdminUser(); // create admin user after DB connected
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Test root route
app.get('/', (req, res) => {
  res.send('🌐 Salon Booking API is live!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
