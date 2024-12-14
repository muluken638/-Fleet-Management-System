const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
