const { Schema, model } = require("mongoose");

const planetsSchema = new Schema({
  kepler_name: {
    type: String,
    require: true,
  },
});

const Planet = model("Planet", planetsSchema);

module.exports = Planet;
