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

//queries
io.on('connection', (socket) => { 
    console.log('New user connected');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // socket.on('createMessage', (message, callback) => {
    //     console.log('createMessage', message);
    //     io.emit('newMessage', generateMessage(message.from,message.text));
    //     callback('This is from the server');
    // });

    // socket.on('disconnect', () => {
    //     console.log('User was disconnected');
    // });
});

// client.query('SELECT * FROM num', (err, res) => {
//     console.log(err, res)
//     client.end()
// });

server.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});