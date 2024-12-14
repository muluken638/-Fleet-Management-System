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
const { default: mongoose } = require("mongoose");
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
// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findByIdAndDelete(id); // Find and delete the product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Product not found
    }
    res.status(200).json({ message: 'Product deleted successfully' }); // Success response
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' }); // Internal server e
  }
});
// UPDATE Product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;  // Extracting the `id` from the URL path
  const updatedData = req.body;  // Getting the updated data from the request body
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.json(updatedProduct);  // Send back the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Server error');
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
