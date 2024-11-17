const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/add', animalController.addAnimal);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimalById);

module.exports = router;