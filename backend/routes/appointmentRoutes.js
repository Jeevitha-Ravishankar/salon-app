const express = require('express');
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
  getBookedSlots, 
} = require('../controllers/appointmentController');


router.get('/bookedSlots', getBookedSlots);


router.post('/', createAppointment);


router.get('/', getAppointments);
router.get('/test', (req, res) => res.send('Appointments routes working!'));


// Admin appointments view
router.get('/admin', getAllAppointments);

// Get appointment by ID
router.get('/:id', getAppointmentById);

// Update appointment by ID
router.put('/:id', updateAppointment);

// Delete appointment by ID
router.delete('/:id', deleteAppointment);

module.exports = router;

