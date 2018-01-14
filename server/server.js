const express = require('express');
const path = require('path');

var {client} = require('./db');

const port = process.env.PORT || 3000;
var app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/pipeline.html'));
});

client.query('SELECT * FROM num', (err, res) => {
    console.log(err, res)
    client.end()
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});