const db = require('../config/db');

const BookingModel = {
  bookTickets: (user_id, event_id, tickets, callback) => {
    const query = `
      INSERT INTO bookings (user_id, event_id, tickets) 
      VALUES (?, ?, ?)
    `;
    db.query(query, [user_id, event_id, tickets], callback);
  },

  updateTicketCount: (event_id, tickets, callback) => {
    const query = `
      UPDATE events 
      SET available_tickets = available_tickets - ? 
      WHERE id = ? AND available_tickets >= ?
    `;
    db.query(query, [tickets, event_id, tickets], callback);
  },

  getUserBookings: (user_id, callback) => {
    const query = `
      SELECT b.id, e.title, e.date, e.location, b.tickets, b.booking_date 
      FROM bookings b 
      JOIN events e ON b.event_id = e.id 
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC
    `;
    db.query(query, [user_id], callback);
  }
};

module.exports = BookingModel;
