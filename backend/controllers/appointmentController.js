const Appointment = require('../models/Appointment');

// Define available time slots for each task
const taskTimeSlots = {
  haircut: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  facial: ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'],
  manicure: ['09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15'],
  pedicure: ['09:45', '10:45', '11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45'],
  massage: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  hairColoring: ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30'],
};

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, task, date, timeSlot } = req.body;

    if (!name || !email || !task || !date || !timeSlot) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    if (!taskTimeSlots[task]) {
      return res.status(400).json({ msg: 'Invalid task selected' });
    }

    if (!taskTimeSlots[task].includes(timeSlot)) {
      return res.status(400).json({ msg: `Invalid time slot for ${task}` });
    }

    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    const count = await Appointment.countDocuments({
      task,
      timeSlot,
      date: appointmentDate,
    });

    if (count >= 3) {
      return res.status(400).json({ msg: `No slots available for ${task} at ${timeSlot} on ${appointmentDate.toDateString()}` });
    }

    const newAppointment = new Appointment({
      name,
      email,
      task,
      date: appointmentDate,
      timeSlot,
    });

    await newAppointment.save();

    res.status(201).json({ msg: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get All Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Appointment updated', updated });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin fetch all appointments sorted by creation date desc
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Booked Slots Endpoint (with logs)
exports.getBookedSlots = async (req, res) => {
  try {
    const { task, date } = req.query;
    console.log('📥 Booked slots request received:', { task, date });

    if (!task || !date) {
      return res.status(400).json({ msg: 'task and date query params are required' });
    }

    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({ task, date: appointmentDate });
    const bookedSlots = appointments.map(a => a.timeSlot);

    res.json(bookedSlots);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


