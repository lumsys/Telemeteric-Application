const mongoose = require('mongoose');

const telemetricSchema = mongoose.Schema({
    engine_temperature: Number,
    car_speed: Number,
    car_longitude: Number,
    car_latitude: Number,
    fuel_consumption_rate: String
})


module.exports = mongoose.model('Telemetric', telemetricSchema);

