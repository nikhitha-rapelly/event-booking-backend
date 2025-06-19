const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  port: 3306,                         // Railway usually uses 3306 for MySQL
  user: 'root', // e.g., root or some generated username
  password: 'xwnPQlaMnnTJlaulAUTAQKgtlrOYOhck',
  database: 'railway'      // the database name Railway gave you
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

module.exports = db;

