const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.get('/', EventController.getAllEvents);
router.get('/search', EventController.searchEvents);
router.post('/', EventController.createEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);


module.exports = router;
