const express = require("express");
const app = express();
app.use(express.json());
const Cors=require("cors");
app.use(Cors());
const { Vehicle } = require('./Models/Vehciles'); 

require("./db/connection");
const User = require("./Models/Users");
app.post("/", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});
const Product = require("./Models/Products");
app.post("/api/products", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get('/api/products', async (req, res) => {
    try {
      const product = await Product.find(); 
      res.json(product);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Error fetching vehicles' });
    }
  });

app.post('/api/vehicles', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        const savedVehicle = await vehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(4000);
