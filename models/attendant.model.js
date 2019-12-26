const mongoose = require("mongoose");

const attendantSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Attendant", attendantSchema);
