const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

router.post('/', BookingController.bookTickets);
router.get('/:user_id', BookingController.getUserBookings);

module.exports = router;
