/////////////////
// First app pairing mongoose and express
// Jordan Sharpe - 19/08/2021
/////////////////

const path = require('path');

const express = require('express');
const app = express();
const PORT = 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());

const mongoose = require('mongoose');
const Product = require('./models/products')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('Connection to the database server was successful!');
    })
    .catch((err)=> {
        console.log('The connection to the database was unsuccessful!');
        console.error(err);
    })

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/product', { product })
})

app.listen(PORT, ()=> {
    console.log('Server started on ', PORT)
});

