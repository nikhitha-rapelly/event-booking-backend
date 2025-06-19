const EventModel = require('../models/EventModel');

const EventController = {
  getAllEvents: (req, res) => {
    EventModel.getAllEvents((err, events) => {
      if (err) return res.status(500).json({ error: err });
      res.json(events);
    });
  },

  searchEvents: (req, res) => {
    const { category, location, date } = req.query;
    EventModel.searchEvents(category, location, date, (err, events) => {
      if (err) return res.status(500).json({ error: err });
      res.json(events);
    });
  },
  createEvent: (req, res) => {
  EventModel.createEvent(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Event created successfully' });
  });
},

updateEvent: (req, res) => {
  EventModel.updateEvent(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Event updated successfully' });
  });
},

deleteEvent: (req, res) => {
  EventModel.deleteEvent(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Event deleted successfully' });
  });
}

};

module.exports = EventController;
