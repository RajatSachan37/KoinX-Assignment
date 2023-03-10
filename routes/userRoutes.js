const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// TASK-1
router
  .route("/fetch-transactions/:address")
  .get(userController.fetchTransactions);

// TASK-2
// fetch the price of Ethereum every 10 minutes and store it in the database.
userController.getEthereumDetails();
setInterval(userController.getEthereumDetails, 600000);

// TASK-3
router.route("/current-balance/:address").get(userController.currentBalance);

module.exports = router;
