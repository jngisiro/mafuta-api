const express = require("express");

const transactionController = require("../controllers/transaction.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, transactionController.getAllTransactions)
  .post(authController.protect, transactionController.createTransaction);

router
  .route("/:id")
  .get(authController.protect, transactionController.getTransaction)
  .patch(
    authController.protect,
    authController.restrictTo("superadmin", "admin"),
    transactionController.updateTransaction
  )
  .delete(
    authController.protect,
    authController.restrictTo("superadmin", "admin"),
    transactionController.deleteTransaction
  );

module.exports = router;
