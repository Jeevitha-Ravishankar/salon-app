const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
