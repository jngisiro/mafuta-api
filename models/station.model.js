const mongoose = require("mongoose");
const Attendant = require("./attendant.model");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  manager: {
    type: String,
    required: true
  },
  attendants: [Attendant],

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
    },
    desription: String
  }
});

module.exports = mongoose.model("Station", stationSchema);
