// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials (email)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials (password)' });
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Optional: create admin user on startup
exports.createAdminUser = async () => {
  try {
    const adminEmail = 'jeevitha.r2023@vitstudent.ac.in';
    const adminPassword = 'Jeevitha';

    let adminUser = await User.findOne({ email: adminEmail });
    if (adminUser) {
      console.log('Admin user already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully.');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};
