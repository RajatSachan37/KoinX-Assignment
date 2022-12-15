const express = require("express");
// const fetch = require("node-fetch");
const mongoose = require("mongoose");
// const User = require("./models/userModel");
// const Crypto = require("./models/cryptoModel");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

const app = express();

app.use("/api/v1/", userRoutes);

dotenv.config({ path: "./config.env" });
const DB = process.env.DB_CONNECTION_STRING;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("KoinX Assignment");
});

// /api/v1/user
// TASK-1
// app.get("/fetch-transactions/:address", async (req, res) => {
//   console.log(req.params.address);

//   // TODO:  set key to env && take user_address from params
//   const user_transactions = await fetch(
//     `https://api.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=G2DZB3CEQKGG7QRF1GR7HURCRQ848U6G42`
//   );

//   //   console.log("typeofstatus", typeof user_transactions);
//   const transactions = await user_transactions.json();

//   //   console.log("transactions", typeof transactions.status);
//   //   console.log(transactions.status);
//   //   console.log("status", transactions.status);
//   //   console.log(transactions);

//   //   console.log("transaction", transactions);

//   if (transactions.status == 1) {
//     console.log("status 1");
//     //   create doc if address is not found else update doc TODO: TRY DIFFERENT APPROACH

//     const currentAddressTransactions = await User.findOne({
//       address: req.params.address,
//     });

//     if (!currentAddressTransactions) {
//       const storedData = await User.create({
//         address: req.params.address,
//         transactions: transactions.result,
//       });
//       console.log(storedData);
//     } else {
//       console.log(
//         "Transactions for this address are already present in the DB"
//       );
//     }

//     // const storedData = await User.findOneAndUpdate(
//     //   { address: req.params.address },
//     //   {
//     //     address: req.params.address,
//     //     transactions: transactions.result,
//     //   },
//     //   { upsert: true, new: true }
//     // );

//     // console.log("storedData:", storedData);
//     res.status(200).json({
//       status: "success",
//       address: req.params.address,
//       transactions: transactions.result,
//       // transactions: transactions,
//     });
//   } else {
//     console.log("status 0");
//     res.status(400).json({
//       status: "fail",
//       address: req.params.address,
//       message: transactions.message,
//     });
//   }
// });

// TASK-2
// findoneandupdate ether details every 10 mins
// const getEtherium = async () => {
//   const etherData = await fetch(
//     "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
//   );
//   const currentEtherPrice = await etherData.json();

//   const storedEtherData = await Crypto.findOneAndUpdate(
//     { cryptoName: "etherium" },
//     { currentPrice: currentEtherPrice.ethereum.inr },
//     { upsert: true, new: true }
//     // { address: req.params.address },
//     // {
//     //   address: req.params.address,
//     //   transactions: transactions.result,
//     // },
//     // { upsert: true, new: true }
//   );
//   console.log(currentEtherPrice.ethereum.inr);
//   console.log(storedEtherData);
// };

// setInterval(getEtherium, 600000);

// TASK-3
// app.get("/current-balance/:address", async (req, res) => {
//   const currentTransactions = await User.findOne({
//     address: req.params.address,
//   });

//   if (currentTransactions) {
//     const etherCurrentPrice = await Crypto.findOne({ cryptoName: "etherium" });
//     let currentBalance = 0;

//     currentTransactions.transactions.forEach((transaction) => {
//       if (transaction.to == currentTransactions.address) {
//         currentBalance += Number(transaction.value);
//         // console.log("to");
//         // console.log("value: ", typeof Number(transaction.value));
//       } else if (transaction.from == currentTransactions.address) {
//         currentBalance -= Number(transaction.value);
//         // console.log("from");
//         // console.log("value:", Number(transaction.value));
//       }
//     });
//     console.log("final balance", currentBalance);

//     res.status(200).json({
//       status: "success",
//       address: req.params.address,
//       currentBalance: currentBalance,
//       currentPriceOfEther: etherCurrentPrice.currentPrice,

//       //   currentTransactions,
//     });
//   } else {
//     res.status(400).json({
//       status: "fail",
//       address: req.params.address,
//       message: "No transactions found",
//     });
//   }

//   //   console.log(currentTransactions);
// });

app.listen(3000, process.env.IP, () => {
  console.log("Server has started on port 3000");
});
