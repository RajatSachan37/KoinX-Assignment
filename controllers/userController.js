const fetch = require("node-fetch");
const User = require("../models/userModel");
const Crypto = require("../models/cryptoModel");

// TASK-1
exports.fetchTransactions = async (req, res) => {
  const user_transactions = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
  );

  const transactions = await user_transactions.json();

  if (transactions.status == 1) {
    const currentAddressTransactions = await User.findOne({
      address: req.params.address,
    });

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
  const etherData = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
  );
  const currentEtherPrice = await etherData.json();

  const storedEtherData = await Crypto.findOneAndUpdate(
    { cryptoName: "etherium" },
    { currentPrice: currentEtherPrice.ethereum.inr },
    { upsert: true, new: true }
  );
  console.log(currentEtherPrice.ethereum.inr);
  console.log(storedEtherData);
};

// TASK-3
exports.currentBalance = async (req, res) => {
  const currentTransactions = await User.findOne({
    address: req.params.address,
  });

  if (currentTransactions) {
    const etherCurrentPrice = await Crypto.findOne({ cryptoName: "etherium" });
    let currentBalance = 0;

    currentTransactions.transactions.forEach((transaction) => {
      if (transaction.to == currentTransactions.address) {
        currentBalance += Number(transaction.value);
      } else if (transaction.from == currentTransactions.address) {
        currentBalance -= Number(transaction.value);
      }
    });
    console.log("final balance", currentBalance);

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
