const express = require('express');
const router = express.Router();

const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');

// POST feedback
router.post('/', submitFeedback);

// GET all feedbacks
router.get('/', getFeedbacks);

module.exports = router;
