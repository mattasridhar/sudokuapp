const expect = require('chai').expect;
const request = require('supertest');

const app = require('../index');

describe('GET', () => {
    // Validating the board when no cell is selected.
    it('Default Sudoku Board(No Cell is Selected)', (done) => {
        request(app).get('/sudoku/board/9')
            .then((res) => {
                console.log("\nSudoku Board (with No Selected Cell) Validated. \n");
                const respBoard = res.body.board;
                const validity = checkValidity(respBoard);
                expect(validity).to.to.to.to.true;
                done();
            })
            .catch((err) => done(err));
    });

    // Validating the board when a cell is selected
    it('Non-Default Sudoku Board(One Cell is Selected)', (done) => {
        request(app).post('/sudoku/boardCell')
        .send({rowIndex: 0, columnIndex: 0, boardSize: 9, value: 9})
            .then((res) => {
                console.log("\nSudoku Board (with Selected Cell) Validated. \n");
                const respBoard = res.body.board;
                const validity = checkValidity(respBoard);

                expect(validity).to.to.to.to.true;
                done();
            })
            .catch((err) => done(err));
    });
});

function checkValidity(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const currentColumn = board.map(function (value) { return value[j]; });
            /* 
            skip testing rest if value is present in Row            
            and/or skip testing the rest of the board if value is present in Column 
            */
            if (rowHasDuplicates(board[i]) || (columnHasDuplicates(currentColumn))) {
                return false;
            } else {
                /* 
                If row and column test pass then check in 3x3 subset grid od board
                skip the test if value is present in 3x3 subset of the board 
                */
                if (subsetHasDuplicates(i, j, board)) {
                    return false;
                }
            }
        }
    }
    return true;
}

//Checks if the 3x3 subset of the board has the duplicates Value
function subsetHasDuplicates(rowIndex, columnIndex, board) {
    let minRowIndex = rowIndex - (rowIndex % 3);
    let minColumnIndex = columnIndex - (columnIndex % 3);
    let boardCopy = [...board];//Deep copy the array to prevent the origin array from having any changes

    //creating a 3x3 subset of the board
    let subsetGrid = [];
    let i = 0;
    for(let row = minRowIndex; row<= minRowIndex + 2; row++){
        subsetGrid[i] = boardCopy[row].slice(minColumnIndex, minColumnIndex + 3);
        i++;
    }
    
    for (let subI = 0; subI < 3; subI++) {
        for (let subJ = 0; subJ < 3; subJ++) {
            const subsetCol = subsetGrid.map(function (subVal) { return subVal[subJ]; });
            if (rowHasDuplicates(subsetGrid[subI]) || (columnHasDuplicates(subsetCol))) {
                return true; //row/column of subset has the value
            }
        }
    }
    return false; //subset lacks the value
}

//Checks whether the Column has the duplicate Values
function columnHasDuplicates(currentColumn) {
    let duplicates = currentColumn.filter((v, i, a) => a.indexOf(v) !== i);
    if (duplicates.length > 0) {
        console.log("Am in col");
        return true;//column has duplicate
    }
    return false;
}

//Checks if the Row has the duplicate values
function rowHasDuplicates(currentRow) {
    let duplicates = currentRow.filter((v, i, a) => a.indexOf(v) !== i);
    if (duplicates.length > 0) {
        console.log("Am in row");
        return true;//row has Duplicates
    }
    return false;
}