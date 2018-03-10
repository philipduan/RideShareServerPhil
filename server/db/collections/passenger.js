const mongoose = require('mongoose');
const { Schema } = mongoose;

const PassengerSchema = new Schema({
  destination: {
    lng: Number,
    lat: Number,
    address: String
  },
  time: Date,
  date: Date
});

const Passenger = mongoose.model('passenger', PassengerSchema);

module.exports = Passenger;
