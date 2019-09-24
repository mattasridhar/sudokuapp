const express = require('express');
const body_parser = require('body-parser');
const boardUrls = require('./services/boardUrls');
const cors = require('cors');

var app = express();
app.use(body_parser.json());
app.use(cors());
const PORT = 8080;

app.get('/', (req, res) => res.send('SudokuServer is at REST on Port: ' + PORT));

var server = app.listen(PORT, () => console.log("SudokuServer is active @PORT: " + PORT));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/sudoku', boardUrls);

module.exports = server
