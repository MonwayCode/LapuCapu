const express = require('express');
const router = express.Router();
const caretakerController = require('../controllers/caretakerController');

router.get('/:animalId', caretakerController.getInfo);

module.exports = router;