import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../api';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchFeedbacks = async () => {
      try {
        const res = await getFeedbacks(token);
        setFeedbacks(res.data);
      } catch (err) {
        alert('Failed to load feedbacks.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token]);

  if (loading) return <p>Loading feedbacks...</p>;
  if (!feedbacks.length) return <p>No feedbacks yet.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Your Feedbacks</h3>
      <ul>
        {feedbacks.map(f => (
          <li key={f._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{f.message}</p>
            <small>{new Date(f.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
