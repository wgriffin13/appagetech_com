const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(volleyball);

app.use(express.json())

app.use(express.static(path.join(__dirname, '../build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});
app.use('/api', require('./api'));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = app;
