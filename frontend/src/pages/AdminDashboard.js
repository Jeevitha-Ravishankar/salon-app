import React, { useEffect, useState } from 'react'; 
import { getAppointments, getFeedbacks } from '../api';
import AdminLogin from './AdminLogin';

const Star = ({ selected }) => (
  <span
    style={{
      color: selected ? '#FFD700' : '#ccc',
      fontSize: '1.2rem',
      marginRight: 2,
      userSelect: 'none',
    }}
  >
    &#9733;
  </span>
);

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await getAppointments(token);
          setAppointments(res.data);
        } catch (err) {
          setError('Failed to load appointments.');
        } finally {
          setLoadingAppointments(false);
        }
      };

      const fetchFeedbacks = async () => {
        try {
          const res = await getFeedbacks();
          setFeedbacks(res.data);
        } catch (err) {
          setError('Failed to load feedbacks.');
        } finally {
          setLoadingFeedbacks(false);
        }
      };

      fetchAppointments();
      fetchFeedbacks();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (error) {
    return (
      <p style={{ color: '#000', textAlign: 'center', fontWeight: 'bold' }}>
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '2rem auto',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
        fontWeight: 'bold',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        Admin Dashboard
      </h1>

      {/* Appointments Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#000', marginBottom: '1rem', fontWeight: 'bold' }}>
          All Appointments
        </h2>
        {loadingAppointments ? (
          <p style={{ color: '#000', fontWeight: 'bold' }}>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p style={{ color: '#000', fontWeight: 'bold' }}>No appointments found.</p>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 0 10px rgba(123, 79, 36, 0.2)',
            }}
          >
            <thead style={{ backgroundColor: '#7B4F24', color: 'white' }}>
              <tr>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Customer
                </th>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Email
                </th>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Task
                </th>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Date
                </th>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Time Slot
                </th>
                <th style={{ padding: '10px', borderBottom: '2px solid #A0522D', fontWeight: 'bold' }}>
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr
                  key={apt._id}
                  style={{
                    borderBottom: '1px solid #D2B48C',
                    backgroundColor: '#FFF8F0',
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                >
                  <td style={{ padding: '10px' }}>{apt.name}</td>
                  <td style={{ padding: '10px' }}>{apt.email}</td>
                  <td style={{ padding: '10px' }}>{apt.task}</td>
                  <td style={{ padding: '10px' }}>
                    {new Date(apt.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px' }}>{apt.timeSlot}</td>
                  <td style={{ padding: '10px' }}>
                    {new Date(apt.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Feedback Section */}
      <section>
        <h2 style={{ color: '#000', marginBottom: '1rem', fontWeight: 'bold' }}>
          Customer Feedback
        </h2>
        {loadingFeedbacks ? (
          <p style={{ color: '#000', fontWeight: 'bold' }}>Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p style={{ color: '#000', fontWeight: 'bold' }}>No feedback available.</p>
        ) : (
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              border: '1px solid #D2B48C',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#FFF8F0',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                style={{
                  borderBottom: '1px solid #D2B48C',
                  paddingBottom: '0.75rem',
                  marginBottom: '0.75rem',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Email:</strong> {fb.email}
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  <strong>Name:</strong> {fb.name}
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  <strong>Message:</strong> {fb.message}
                </p>
                <p style={{ margin: '0.25rem 0', display: 'flex', alignItems: 'center' }}>
                  <strong style={{ marginRight: 8 }}>Rating:</strong>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} selected={star <= fb.rating} />
                  ))}
                </p>
                <small style={{ color: '#555', fontWeight: 'normal' }}>
                  Submitted on {new Date(fb.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
