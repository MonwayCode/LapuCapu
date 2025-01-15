const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/add', animalController.addAnimal);
router.get('/with-caretaker', animalController.getAllAnimalsWithCaretaker);
router.get('/:animalId', animalController.getAnimalById);
router.get('/', animalController.getAllAnimals);

router.put('/:animalId', animalController.updateAnimal);
router.delete('/:animalId', animalController.deleteAnimalImages);

module.exports = router;