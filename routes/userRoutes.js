const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();
// router.use(express.json()); //Body parser

// TASK-1
router
  .route("/fetch-transactions/:address")
  .get(userController.fetchTransactions);

// TASK-2
setInterval(userController.getEthereumDetails, 600000);

// TASK-3
router.route("/current-balance/:address").get(userController.currentBalance);

module.exports = router;
