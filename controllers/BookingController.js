const BookingModel = require('../models/BookingModel');

const BookingController = {
  bookTickets: (req, res) => {
    const { user_id, event_id, tickets } = req.body;

    BookingModel.updateTicketCount(event_id, tickets, (err, result) => {
      if (err || result.affectedRows === 0) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }

      BookingModel.bookTickets(user_id, event_id, tickets, (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: 'Booking successful' });
      });
    });
  },

  getUserBookings: (req, res) => {
    const user_id = req.params.user_id;
    BookingModel.getUserBookings(user_id, (err, bookings) => {
      if (err) return res.status(500).json({ error: err });
      res.json(bookings);
    });
  }
};

module.exports = BookingController;
