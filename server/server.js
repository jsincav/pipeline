const express = require('express');
const hbs = require('hbs');
var passport = require('passport');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var flash = require('connect-flash');

var {client} = require('./db');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//handlebars
hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.set('view engine', 'hbs');

app.use(express.static(publicPath));

require(path.join(__dirname, './configuration/passport'))(passport); //pass passport for configuration

app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: "sdfgsdfgsdhrthrth" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require(path.join(__dirname, './routes'))(app, passport);

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
