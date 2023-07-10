const express = require('express');
const mongoose = require('mongoose');
const Product = require('./Models/ProductsModel');
const app = express();
app.use(express.urlencoded({ extended:false}));
// Middleware for parsing JSON data
app.use(express.json());

app.get('/', async(req, res) => {
    try {
        const product= await Product.find({});
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/getbyname/:name', async(req, res) => {
    try {
        const product= await Product.find({name: req.params.name});
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/:id', async(req, res) => {
    try {
        const {id} =req.params;
         console.log(id);
        const product= await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/productdetails', async(req, res) => {
    try {
        const product= await Product.find({name: req.params.name});
        const updated= await product.put(req.body);
        res.status(200).json(updated);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  
});
app.put('/productdetails/:id', async(req, res) => {
    try {
        const {id}=req.params;

        const product= await Product.findByIdAndUpdate(id,req.body);
       if(!product){
        return res.status(400).json({message: `Product not found with id:${id}`});
       }
        res.status(200).json();
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  
});
app.delete('/delete/:id', async(req, res) => {
    try {
        const {id}=req.params;

        const product= await Product.findByIdAndDelete(id);
       if(!product){
        return res.status(400).json({message: `Product not found with id:${id}`});
       }
        res.status(200).json();
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@cluster0.l2gmyws.mongodb.net/Node_Api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected');
        // Start the server after the database connection is successful
        app.listen(3300, () => {
            console.log('Server is listening on http://localhost:3300');
        });
    })
    .catch((err) => {
        console.error(err);
    });
