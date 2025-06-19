const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);



const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => {
  res.send('Event Booking API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const runEmailReminderJob = require('./scheduler/reminderJob');
runEmailReminderJob();

