const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authenticate = require("../middlewares/auth");

router.get('/:walletId/transactions', authenticate, transactionController.getAllTransactions);
router.post('/:walletId/transactions', authenticate, transactionController.createTransaction);
router.get('/:walletId/monthtransactions', authenticate, transactionController.getMonthTransactions)

module.exports = router;