const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Transaction sender is required"]
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Transaction Recipient is required"]
  },
  amount: {
    type: Number,
    required: [true, "Transaction Amount is required"]
  },
  transactionType: {
    type: String,
    required: [true, "Transaction type is required"],
    enum: {
      values: ["deposit", "transfer"],
      message: "Transaction Type is either transfer or deposit"
    }
  },
  fuelType: {
    type: String,
    required: [true, "Fuel type is required"],
    enum: {
      values: ["petrol", "diesel"],
      message: "Fuel type is either petrol or diesel"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// transactionSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "sender",
//     select: "-transactions -__v -_id -role"
//   }).populate({
//     path: "receiver",
//     select: "-transactions -__v -_id -role"
//   });
//   next();
// });

transactionSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
