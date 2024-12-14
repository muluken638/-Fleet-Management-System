const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'], // You can adjust status values
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("vehicles", vehicleSchema);
