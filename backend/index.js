const express = require('express');
const boardUrls = require('./services/boardUrls');

var app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('Hello Sridhar'));

app.listen(PORT, () => console.log("Sridhar listening to port: " + PORT));

app.use('/sudoku', boardUrls);