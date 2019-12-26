const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  station: {
    type: String,
    required: true
  },
  attendant: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
