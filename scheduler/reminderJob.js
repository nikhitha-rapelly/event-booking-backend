const cron = require('node-cron');
const db = require('../config/db');
const sendReminderEmail = require('../utils/mailer');

const runEmailReminderJob = () => {
  cron.schedule('0 9 * * *', () => {
    console.log('⏰ Running daily email reminder job...');

    const query = `
      SELECT u.email, e.title, e.date, e.time, e.location
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN events e ON b.event_id = e.id
      WHERE DATE(e.date) = CURDATE() + INTERVAL 1 DAY
    `;

    db.query(query, (err, results) => {
      if (err) return console.error('Query error:', err);

      results.forEach(({ email, title, date, time, location }) => {
        const msg = `Reminder: You have booked "${title}" on ${date} at ${time}, ${location}.`;
        sendReminderEmail(email, `Event Reminder: ${title}`, msg);
      });
    });
  });
};

module.exports = runEmailReminderJob;
