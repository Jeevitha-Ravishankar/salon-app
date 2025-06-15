const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating) {
      return res.status(400).json({ msg: 'Please provide all fields including rating.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5.' });
    }

    const feedback = new Feedback({ name, email, message, rating });
    await feedback.save();

    res.status(201).json({ msg: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
