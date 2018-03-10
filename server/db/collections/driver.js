const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
const { Schema } = mongoose;
const CarInfoSchema = require('./carInfo');

const DriverSchema = new Schema({
  driverInfo: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  startingAddress: String,
  destinationAddress: String,
  destination: mongoose.Schema.Types.Point,
  time: String,
  date: String,
  capacity: Number,
  occupants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  carInfo: CarInfoSchema
});

DriverSchema.index({ destination: '2dsphere' });

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
