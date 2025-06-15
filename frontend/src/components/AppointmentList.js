import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment, updateAppointment } from '../api';

const taskTimeSlots = {
  haircut: ['09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00'],
  facial: ['09:30', '10:30', '11:30', '12:30','13:30', '14:30', '15:30', '16:30', '17:30'],
  manicure: ['09:15', '10:15', '11:15', '12:15','13:15', '14:15', '15:15', '16:15', '17:15'],
  pedicure: ['09:45', '10:45', '11:45', '12:45','13:45', '14:45', '15:45', '16:45', '17:45'],
  massage: ['10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00'],
  hairColoring: ['09:30', '10:30', '11:30', '12:30','13:30', '14:30', '15:30', '16:30'],
};

const AppointmentList = ({ userEmail }) => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ task: '', date: '', timeSlot: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAppointments(token);
        const allAppointments = res.data;
        const userAppointments = allAppointments.filter(a => a.email === userEmail);
        setAppointments(userAppointments);
      } catch (err) {
        alert('❌ Failed to fetch appointments');
      }
    };

    if (token && userEmail) {
      fetchAppointments();
    } else {
      alert('⚠️ You must be logged in to view appointments');
    }
  }, [token, userEmail]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    try {
      await deleteAppointment(id, token);
      alert('🗑️ Appointment deleted');
      setAppointments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      alert('❌ Failed to delete appointment');
    }
  };

  const startEditing = (appt) => {
    setEditingId(appt._id);
    setEditData({ task: appt.task, date: appt.date, timeSlot: appt.timeSlot });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ task: '', date: '', timeSlot: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    const { task, date, timeSlot } = editData;
    if (!task || !date || !timeSlot) {
      alert('Please fill all fields before updating.');
      return;
    }

    try {
      await updateAppointment(id, editData, token);
      alert('✅ Appointment updated!');
      setAppointments(prev =>
        prev.map(appt => appt._id === id ? { ...appt, task, date, timeSlot } : appt)
      );
      cancelEditing();
    } catch (err) {
      alert('❌ Failed to update appointment.');
    }
  };

  const getAvailableTimeSlots = (task) => {
    return taskTimeSlots[task] || [];
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Your Appointments</h3>
      {appointments.length === 0 && <p>No appointments found.</p>}

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => (
            <tr key={appt._id}>
              <td>
                {editingId === appt._id ? (
                  <select name="task" value={editData.task} onChange={handleEditChange}>
                    <option value="">Select Task</option>
                    {Object.keys(taskTimeSlots).map(task => (
                      <option key={task} value={task}>
                        {task.charAt(0).toUpperCase() + task.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  appt.task.charAt(0).toUpperCase() + appt.task.slice(1)
                )}
              </td>

              <td>
                {editingId === appt._id ? (
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={handleEditChange}
                  />
                ) : (
                  appt.date
                )}
              </td>

              <td>
                {editingId === appt._id ? (
                  <select name="timeSlot" value={editData.timeSlot} onChange={handleEditChange}>
                    <option value="">Select Time Slot</option>
                    {getAvailableTimeSlots(editData.task).map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                ) : (
                  appt.timeSlot
                )}
              </td>

              <td>
                {editingId === appt._id ? (
                  <>
                    <button onClick={() => handleUpdate(appt._id)}>Save</button>
                    <button onClick={cancelEditing} style={{ marginLeft: '5px' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(appt)}>Edit</button>
                    <button onClick={() => handleDelete(appt._id)} style={{ marginLeft: '5px' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
