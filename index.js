/////////////////
// First app pairing mongoose and express
// Jordan Sharpe - 19/08/2021
/////////////////

const path = require('path');

const express = require('express');
const app = express();
const PORT = 3000

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, ()=> {
    console.log('Server started on ', PORT)
});

