import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if your backend URL/port is different
});

// Attach token automatically to requests that require authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (data) => API.post('/auth/register', data);

// Appointment APIs
export const bookAppointment = (data) => API.post('/appointments', data);
export const getAppointments = () => API.get('/appointments/admin');
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
export const updateAppointment = (id, data) => API.put(`/appointments/${id}`, data);

// Get booked time slots (no auth needed)
export const getBookedSlots = (task, date) =>
  API.get(`/appointments/bookedSlots`, {
    params: { task, date },
  });

// Feedback APIs
export const submitFeedback = (data) => API.post('/feedback', data);
export const getFeedbacks = () => API.get('/feedback');

