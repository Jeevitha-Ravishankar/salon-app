// backend/models/Appointment.js

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
      lowercase: true,
      trim: true,
    },
    task: {
      type: String,
      required: [true, 'Task is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
