const express = require('express');
var path = require('path');

const port = process.env.PORT || 3000;
var app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/pipeline.html'));
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});