const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var {client} = require('./db');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/pipeline.html'));
});

var query = client.query("LISTEN watchers");

io.on('connection', function(socket){
    socket.on('chart', function(data){
        
        client.query('SELECT * FROM num ORDER BY num_date')
            .then(numResult => {
                client.query('SELECT * FROM age ORDER BY age_date')
                    .then(ageResult => {
                        io.emit('chart', {numResult, ageResult});
                    });
            })
            .catch(e => console.log(e.stack));
    });

    client.on('notification', (data) => {
        socket.emit('update', {message: data});   
    });

});

server.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});