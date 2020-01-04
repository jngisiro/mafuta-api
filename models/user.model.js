const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Transaction = require("./transaction.model");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "Please provide a first name"] },
  lastname: { type: String, required: [true, "Please provide a last name"] },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  transactions: Array,
  photo: String,
  role: {
    type: String,
    enum: ["user", "attendant", "manager", "admin", "gm", "superadmin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false // Password field won't be selected in a user query
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      // Custom validator only runs on Create() & Save()
      validator: function(el) {
        return el === this.password;
      },
      msg: "Passwords do not match"
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordChangedAt: {
    type: Date,
    select: false
  }, // Created only when a user changes password
  passwordResetToken: String,
  passwordResetExpires: Date
});

// This function runs everytime a new document is created or saved in the database
userSchema.pre("save", async function(next) {
  // check if the password field has been modified before running the hash or exiting if not
  if (!this.isModified("password")) return next();

  // Password hashed
  this.password = await bcrypt.hash(this.password, 12);

  // Ignores / deletes the passwordconfirm field
  this.passwordConfirm = undefined;

  // Onto the next middleware
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// userSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "transactions",
//     select: "-__v"
//   });
//   next();
// });

// Embed transaction documents into the User document
// userSchema.pre("save", async function() {
//   const transactionPromises = this.transactions.map(
//     async id => await Transaction.findById(id)
//   );
//   this.transactions = await Promise.all(transactionPromises);
// });

// userSchema.pre(/^find/, async function(next) {
//   const transactions = await Transaction.find();
//   console.log(transactions);
//   this.transactions = transactions;
//   next();
// });

// userSchema.virtual("transactions", {
//   ref: "Transaction",
//   foreignField: "sender/_id",
//   localField: "_id"
// });

// Instance method for all user documents
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// eslint-disable-next-line camelcase
userSchema.methods.changedPasswordAfterToken = function(JWT_timeStamp) {
  // Check if user has chnaged password
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // eslint-disable-next-line camelcase
    return JWT_timeStamp < changedTimeStamp;
  }

  // False means password not changed after token was issued
  return false;
};

userSchema.methods.createdPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
