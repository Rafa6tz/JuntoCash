const router = require('express').Router();
const categorieController = require('../controllers/categorieController');

router.get('/:id/income', categorieController.getIncomeCategories);
router.get('/:id/expense', categorieController.getExpenseCategories);

module.exports = router;

