const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarInfoSchema = new Schema({
  make: String,
  model: String,
  fuelEconomy: Number,
  licensePlate: String
});

module.exports = CarInfoSchema;
