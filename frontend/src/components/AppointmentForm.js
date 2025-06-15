import React, { useState, useEffect } from 'react';
import { bookAppointment, getBookedSlots } from '../api';
import AppointmentList from './AppointmentList';
import styles from './AppointmentForm.module.css';
import { useNavigate } from 'react-router-dom';

const taskTimeSlots = {
  haircut: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  facial: ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'],
  manicure: ['09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15'],
  pedicure: ['09:45', '10:45', '11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45'],
  massage: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  hairColoring: ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30'],
};

const AppointmentForm = () => {
  const token = localStorage.getItem('token');
  const storedEmail = localStorage.getItem('userEmail') || '';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState(storedEmail);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [showAppointments, setShowAppointments] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!task || !date) {
      setAvailableSlots([]);
      setTimeSlot('');
      setError('');
      return;
    }

    const fetchAvailableSlots = async () => {
      setLoadingSlots(true);
      setError('');
      try {
        const response = await getBookedSlots(task, date);
        const booked = response.data || [];
        const free = taskTimeSlots[task].filter(slot => !booked.includes(slot));
        setAvailableSlots(free);
        setTimeSlot('');
      } catch (err) {
        const cached = localStorage.getItem(`availableSlots_${task}_${date}`);
        if (cached) {
          setAvailableSlots(JSON.parse(cached));
          setTimeSlot('');
          setError('Loaded slots from cache due to fetch failure.');
        } else {
          setError('Failed to fetch available time slots.');
          setAvailableSlots([]);
        }
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [task, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !task || !date || !timeSlot) {
      setError('Please fill in all fields.');
      return;
    }

    if (!token) {
      setError('You must be logged in to book an appointment.');
      return;
    }

    const appointment = { name, email, task, date, timeSlot };
    setBookingLoading(true);

    try {
      await bookAppointment(appointment, token);
      alert('✅ Appointment booked successfully!');
      setName('');
      // keep email because user logged in
      setTask('');
      setDate('');
      setTimeSlot('');
      localStorage.removeItem(`availableSlots_${task}_${date}`);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error booking appointment.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className={styles.appointmentFormContainer}>
      <h2 className={styles.title}>Book an Appointment</h2>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={!!storedEmail} // disable if email from localStorage (logged in)
          />
        </div>

        <div className={styles.formGroup}>
          <label>Task</label>
          <select value={task} onChange={e => setTask(e.target.value)} required>
            <option value="">Select a task</option>
            {Object.keys(taskTimeSlots).map(key => (
              <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Date</label>
          <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Time Slot</label>
          <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required>
            <option value="">Select Time Slot</option>
            {loadingSlots && <option disabled>Loading...</option>}
            {!loadingSlots && availableSlots.length === 0 && <option disabled>No available slots</option>}
            {!loadingSlots && availableSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton} disabled={bookingLoading}>
          {bookingLoading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowAppointments(!showAppointments)}>
          {showAppointments ? 'Hide My Appointments' : 'View My Appointments'}
        </button>

        <button
          style={{ marginLeft: '10px' }}
          onClick={() => navigate('/feedback', { state: { name, email } })}
        >
          Provide Feedback
        </button>
      </div>

      {showAppointments && email && <AppointmentList userEmail={email} />}
    </div>
  );
};

export default AppointmentForm;
