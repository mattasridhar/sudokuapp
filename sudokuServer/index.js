const express = require('express');
const body_parser = require('body-parser');
const boardUrls = require('./services/boardUrls');
const cors = require('cors');

var app = express();
app.use(body_parser.json());
app.use(cors());
const PORT = 8080;

app.get('/', (req, res) => res.send('Hello Sridhar from backend:8080'));

var server = app.listen(PORT, () => console.log("Sridhar listening to port: " + PORT));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200', //this is my front-end url for development
    'http://localhost:9093',
    'http://sudoku-ws-docker'
];
var corsOptions = {
        origin: function(origin, callback) {
            var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials: true
    }
    //here is the magic
app.use(cors(corsOptions));

app.use('/sudoku', boardUrls);

module.exports = server