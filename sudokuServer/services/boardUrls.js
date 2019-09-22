const express = require('express');
const router = express.Router();
const cors = require('cors');

const SudokuValues = require('../transpiledJs/SudokuValues');

var corsOptions = {
    origin: 'http:localhost:4200/',//'http://sudoku.com',
    optionsSuccessStatus: 200 
}

router.get('/test', cors(corsOptions), (req, res, next) => {
    console.log("Sudoku Board test")
    res.json({ message: "Sudoku Board Service Test Successfull" });
});

//Service to handle non-default scenario i.e. cell is selected on the sudoku board
//accepts the location of the selectedCell on the Board as its request body
router.post('/boardCell', cors(corsOptions), (req, res, next) => {
    console.time("Sudoku Board with Selected Cell Generated in");

    let initBoard = new SudokuValues(createTemplateBoard(req.body), req.body.boardSize);

    let finalBoard = initBoard.finalSudukoBoard().generatedBoard;
    console.log("SUDOKU BOARD (WITH CELL SELECTION):");
    console.log(finalBoard);
    console.timeEnd("Sudoku Board with Selected Cell Generated in");
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ board: finalBoard });
});

//Service to handle default scenario i.e. no cell is selected.
//Why the 'boardSize' in params you ask? Well thats in case we have time to implement for varying sizes of sudoku board
router.get('/board/:boardSize', cors(corsOptions), (req, res, next) => {
    console.time("Sudoku Board without Selected Cell Generated in");

    let initBoard = new SudokuValues(createTemplateBoard(req.body), req.params.boardSize);

    let finalBoard = initBoard.finalSudukoBoard().generatedBoard;
    console.log("SUDOKU BOARD (WITHOUT CELL SELECTION):");
    console.log(finalBoard);
    console.timeEnd("Sudoku Board without Selected Cell Generated in");
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ board: finalBoard });
});

function createBlankRow(rowSize) {
    let blankRow = new Array();
    for (let i = 0; i < rowSize; i++) {
        blankRow[i] = 0;
    }
    return blankRow;
}

function createPopulatedRow(colSize, colIndex, value) {
    let populatedRow = new Array();
    for (let i = 0; i < colSize; i++) {
        if (i === colIndex) {
            populatedRow[i] = value;
        } else {
            populatedRow[i] = 0;
        }
    }
    return populatedRow;
}

function createTemplateBoard(reqBody) {
    const selectedValue = reqBody.value;
    if (selectedValue) {
        const BOARD_SIZE = reqBody.boardSize;
        const selectedRow = reqBody.rowIndex;
        const selectedColumn = reqBody.columnIndex;
        const blankRow = createBlankRow(BOARD_SIZE);
        const populatedRow = createPopulatedRow(BOARD_SIZE, selectedColumn, +selectedValue);
        console.log("SELECTED CELL @ " + (selectedRow + 1) + "th ROW & " + (selectedColumn + 1) + "th COLUMN WITH ITS CONTENTS AS: " + selectedValue)
        let initBoard = new Array();
        for (let i = 0; i < BOARD_SIZE; ++i) {
            if (i === selectedRow) {
                initBoard[i] = populatedRow;
            } else {
                initBoard[i] = blankRow;
            }
        }
        return initBoard;
    } else {
        const initBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        return initBoard;
    }

}

module.exports = router;