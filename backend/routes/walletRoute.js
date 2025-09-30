const router = require("express").Router();
const walletController = require("../controllers/walletController");
const authenticate = require("../middlewares/auth");

router.get('/:id/balance', authenticate, walletController.getWalletBalance);
router.post('/', authenticate, walletController.createWallet);
router.get('/', authenticate, walletController.getWallets);


module.exports = router;