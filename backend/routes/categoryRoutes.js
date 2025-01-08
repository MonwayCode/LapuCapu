const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add', categoryController.addCategory);
router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getAllCategories);

router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategoryById);
module.exports = router;