const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transaction.model");
const resHandler = require("./responseHandler");

exports.getAllTransactions = resHandler.getAll(Transaction, "Transaction");

exports.getTransaction = resHandler.getOne(Transaction, "Transaction");

exports.updateTransaction = resHandler.updateOne(Transaction, "Transaction");

exports.deleteTransaction = resHandler.deleteOne(Transaction, "Transaction");

exports.createTransaction = catchAsync(async (req, res, next) => {
  if (!req.user.id) req.user.id = req.params.userid;

  const transaction = await Transaction.create({
    sender: req.user.id,
    receiver: req.body.receiver,
    amount: req.body.amount,
    fuelType: req.body.fuelType,
    transactionType: req.body.transactionType
  });

  res.status(201).json({
    status: "Success",
    message: "Transaction created",
    transaction
  });
});
