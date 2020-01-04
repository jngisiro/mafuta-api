const express = require("express");

const transactionController = require("../controllers/transaction.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(
    authController.restrictTo("user", "attendant"),
    transactionController.createTransaction
  );

router
  .route("/:id")
  .get(transactionController.getTransaction)
  .patch(
    authController.restrictTo("superadmin", "admin"),
    transactionController.updateTransaction
  )
  .delete(
    authController.restrictTo("superadmin", "admin"),
    transactionController.deleteTransaction
  );

module.exports = router;
