const fetch = require("node-fetch");
const User = require("../models/userModel");
const Crypto = require("../models/cryptoModel");

// TASK-1
exports.fetchTransactions = async (req, res) => {
  // fetch user transactions
  const user_transactions = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
  );

  const transactions = await user_transactions.json();

  // check transaction response status
  if (transactions.status == 1) {
    // Look for doc with given address in the DB
    const currentAddressTransactions = await User.findOne({
      address: req.params.address,
    });

    // If doc is not present then create one
    if (!currentAddressTransactions) {
      const storedData = await User.create({
        address: req.params.address,
        transactions: transactions.result,
      });
      console.log(storedData);
    } else {
      console.log(
        `Transactions for address: ${req.params.address} are already present in the DB`
      );
    }

    // send api response
    res.status(200).json({
      status: "success",
      address: req.params.address,
      transactions: transactions.result,
    });
  } else {
    res.status(400).json({
      status: "fail",
      address: req.params.address,
      message: transactions.message,
    });
  }
};

// TASK-2
exports.getEthereumDetails = async () => {
  // fetch ether data
  const etherData = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
  );
  const currentEtherPrice = await etherData.json();

  // store ether data in the DB
  const storedEtherData = await Crypto.findOneAndUpdate(
    { cryptoName: "etherium" },
    { currentPrice: currentEtherPrice.ethereum.inr },
    { upsert: true, new: true }
  );
  console.log(storedEtherData);
};

// TASK-3
exports.currentBalance = async (req, res) => {
  // find user doc using the given address
  const currentTransactions = await User.findOne({
    address: req.params.address,
  });

  if (currentTransactions) {
    // fetch ether data from the DB
    const etherCurrentPrice = await Crypto.findOne({ cryptoName: "etherium" });
    let currentBalance = 0;

    // loop over all the transactions and calculate the current balance of the user
    currentTransactions.transactions.forEach((transaction) => {
      if (transaction.to == currentTransactions.address) {
        // If the “to” address is of the user, the “value” property gets added to the user’s balance.
        currentBalance += Number(transaction.value);
      } else if (transaction.from == currentTransactions.address) {
        // If the “from” address is of the user, the “value” property gets deducted from the user’s balance.
        currentBalance -= Number(transaction.value);
      }
    });
    console.log("final balance", currentBalance);

    // send api response
    res.status(200).json({
      status: "success",
      address: req.params.address,
      currentBalance: currentBalance,
      currentPriceOfEther: etherCurrentPrice.currentPrice,
    });
  } else {
    res.status(400).json({
      status: "fail",
      address: req.params.address,
      message: "No transactions found",
    });
  }
};
