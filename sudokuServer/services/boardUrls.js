const express = require('express');
const router = express.Router();

const SudokuValues = require('../transpiledJs/SudokuValues');

router.get('/test', (req, res, next) => {
    console.log("Testing Board API")
    res.json({ msg: "Board Service Test Successfull" });
});

router.get('/board', (req, res, next) => {
    console.log("Sridhar Board API")

    let sudokuValues = new SudokuValues(1, 2, 3);
    sudokuValues.createBoardValues();
    res.json({ msg: "Sridhar Board Service Test Successfull" });
});

module.exports = router;