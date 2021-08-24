/////////////////
// First app pairing mongoose and express
// Jordan Sharpe - 19/08/2021
/////////////////


const methodOverride = require('method-override');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const mongoose = require('mongoose');
const Product = require('./models/products');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('Connection to the database server was successful!');
    })
    .catch((err)=> {
        console.log('The connection to the database was unsuccessful!');
        console.error(err);
    })
app.get('/', (req, res) => {
    res.redirect('/products')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/product', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product })
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    res.redirect('/products')
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    
    res.redirect(`/products/${product._id}`)
})

app.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;
    const products = await Product.find({category});
    res.render('products/category', {products})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()

    res.redirect(`/products/${newProduct._id}`)
})


app.listen(PORT, ()=> {
    console.log('Server started on ', PORT)
});

