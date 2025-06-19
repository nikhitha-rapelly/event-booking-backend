const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Nikhitha16', // update with your MySQL password
  database: 'event_booking'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = connection;

