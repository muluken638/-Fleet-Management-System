const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    platenumber: String,
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'], // Allowed status values
        required: true // Ensure the status field is mandatory
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("products", usersSchema);
