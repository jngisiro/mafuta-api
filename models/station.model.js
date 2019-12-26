const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  manager: {
    type: String,
    required: true
  },
  attendants: Array,
  
  transactions: {
    type: String
  },
  imageCover: {
    type: String
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"]
    },
    coordinates: [Number],
    address: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model("Station", stationSchema);
