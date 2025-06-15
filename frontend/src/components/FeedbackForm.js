import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { name, email, message, rating } = formData;

    if (!name || !email || !message || rating === 0) {
      setError('Please fill in all fields and select a rating.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/feedback', formData);
      setSubmitted(true);
    } catch {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #D2B48C',
          borderRadius: '8px',
          backgroundColor: '#FFF8F0',
          color: '#000',
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '2rem auto',
        }}
      >
        THANKS FOR YOUR VALUABLE FEEDBACK AND RATING, {formData.name.toUpperCase()}!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #D2B48C',
        borderRadius: '8px',
        backgroundColor: '#FFF8F0',
      }}
    >
      <h2 style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Submit Feedback</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
      />
      <textarea
        name="message"
        placeholder="Your feedback..."
        value={formData.message}
        onChange={handleChange}
        rows="5"
        style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
      />

      {/* Star rating */}
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            selected={star <= formData.rating}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#7B4F24',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

const Star = ({ selected, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: selected ? '#FFD700' : '#ccc',
      fontSize: '2rem',
      marginRight: 5,
      userSelect: 'none',
    }}
  >
    &#9733;
  </span>
);

export default FeedbackForm;
