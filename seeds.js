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

const p = new Product({
    name: 'Grape fruit',
    price: 1.99,
    category: 'fruit'
})
p.save()
    .then(p => {
        console.log(p);
    }).catch(e => {
        console.error(e);
    })