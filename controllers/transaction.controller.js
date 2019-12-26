const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/app-error");
const Transaction = require("../models/transaction.model");

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find();
  res.status(200).json({
    status: "Success",
    data: {
      transactions
    }
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.create(req.body);
  res.status(200).json({
    status: "Success",
    message: "Transaction created",
    transaction
  });
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction)
    return next(new AppError(`No User found with ID: ${req.params.id}`, 404));
  res.status(200).json({
    status: "Success",
    transaction
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!transaction)
    return next(new AppError(`No User found with ID: ${req.params.id}`, 404));

  res.status(200).json({
    status: "Success",
    data: {
      transaction
    }
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);

  if (!transaction)
    return next(new AppError(`No User found with ID: ${req.params.id}`, 404));

  res.status(200).json({
    status: "Success",
    data: null
  });
});
