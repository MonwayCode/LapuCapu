const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

//Trasa do dodawania nowego wydarzenia
router.post('/newevent', eventController.addEvent);

//Trasa do pobierania wydarzeń z bazy
router.get('/', eventController.getEvent);

//Trasa do usuwania wydarzeń z bazy
router.delete('/removeevent/:eventId', eventController.deleteEvent);

module.exports = router;
