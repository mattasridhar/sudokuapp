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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/sudoku', boardUrls);

module.exports = server