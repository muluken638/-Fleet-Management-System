const mongoose = require('mongoose');

// MongoDB connection string
const uri = 'mongodb://localhost:27017/vehiclemanagment';

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully!');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
