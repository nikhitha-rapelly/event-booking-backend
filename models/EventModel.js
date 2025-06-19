const db = require('../config/db');

const EventModel = {
  getAllEvents: (callback) => {
    const query = 'SELECT * FROM events ORDER BY date ASC';
    db.query(query, callback);
  },

  searchEvents: (category, location, date, callback) => {
    let query = 'SELECT * FROM events WHERE 1=1';
    const values = [];

    if (category) {
      query += ' AND category = ?';
      values.push(category);
    }
    if (location) {
      query += ' AND location LIKE ?';
      values.push(`%${location}%`);
    }
    if (date) {
      query += ' AND date = ?';
      values.push(date);
    }
    
    db.query(query, values, callback);
  },
  
   createEvent: (event, callback) => {
    const query = `
      INSERT INTO events (title, description, date, time, location, category, available_tickets)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      event.title,
      event.description,
      event.date,
      event.time,
      event.location,
      event.category,
      event.available_tickets
    ];
    db.query(query, values, callback);
  },

  deleteEvent: (id, callback) => {
    const query = 'DELETE FROM events WHERE id = ?';
    db.query(query, [id], callback);
  },

  updateEvent: (id, event, callback) => {
    const query = `
      UPDATE events SET title=?, description=?, date=?, time=?, location=?, category=?, available_tickets=? 
      WHERE id = ?
    `;
    const values = [
      event.title,
      event.description,
      event.date,
      event.time,
      event.location,
      event.category,
      event.available_tickets,
      id
    ];
    db.query(query, values, callback);
  }
};

module.exports = EventModel;
