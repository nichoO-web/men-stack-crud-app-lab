const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
    name: String,
    description: String
  });

const Car = mongoose.model('Car', carsSchema);

module.exports = Car;