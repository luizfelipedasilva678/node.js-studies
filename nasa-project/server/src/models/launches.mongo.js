const { Schema, model } = require("mongoose");

const launchesSchema = Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  launchDate: {
    required: true,
    type: Date,
  },
  customer: [String],
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Launch = model("Launch", launchesSchema);

module.exports = Launch;
