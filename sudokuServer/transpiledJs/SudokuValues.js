"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/*
 Create the Sudoku board with potential values.
 Making use of Backtracking Algorithm in a recursive manner. Reference: https://www.tutorialspoint.com/introduction-to-backtracking-algorithms
 */
function populateBoardCandidates(currentBoard, randomArray) {
    var toBePopulated = indexToBePopulated(currentBoard);
    if (toBePopulated.rowIndex !== -1 && toBePopulated.columnIndex !== -1) {
        var row = toBePopulated.rowIndex;
        var column = toBePopulated.columnIndex;
        for (var i = 0; i < 9; i++) {
            var toBeStored = randomArray[i];
            if (isPotentialCandidate(row, column, toBeStored, currentBoard)) {
                var storedValue = injectPotentialCandidate(toBeStored, row, column, currentBoard);
                var updatedBoard = populateBoardCandidates(storedValue, randomArray);
                if (updatedBoard != null) {
                    return updatedBoard;
                }
            }
        }
    }
    else { // all Board cells are populated
        return currentBoard;
    }
}
//returns a Json object with the RowIndex and columnIndex that needs to be populated with potential candidates
function indexToBePopulated(currentBoard) {
    var toBeFilled = {
        rowIndex: -1,
        columnIndex: -1
    };
    for (var row = 0; row < currentBoard.BOARD_SIZE; row++) {
        for (var column = 0; column < currentBoard.BOARD_SIZE; column++) {
            if (currentBoard.generatedBoard[row][column] == 0) {
                toBeFilled = {
                    rowIndex: row,
                    columnIndex: column
                };
                return toBeFilled;
            }
        }
    }
    return toBeFilled;
}
/*
 Verify if the 'toBeStored' value is a potential candidate or not for the specific cell.
 returns True only if its neither in the specific row and column and in the specific 3x3 subset of entire board
 */
function isPotentialCandidate(row, column, toBeStored, currentBoard) {
    return !rowContainsValue(row, toBeStored, currentBoard) && !columnContainsValue(column, toBeStored, currentBoard) && !subsetContainsValue(row, column, toBeStored, currentBoard);
}
//returns true if 'toBeStored' is found in the specific row
function rowContainsValue(rowIndex, toBeStored, currentBoard) {
    if (currentBoard.generatedBoard[rowIndex].indexOf(toBeStored) !== -1) {
        return true; //row has the value
    }
    return false; //row lacks the value
}
//returns true if 'toBeStored' is found in the specific column
function columnContainsValue(columnIndex, toBeStored, currentBoard) {
    var checkColArray = currentBoard.generatedBoard.map(function (value) { return value[columnIndex]; });
    if (checkColArray.indexOf(toBeStored) !== -1) {
        return true; //column has the 'toBeStored' Value
    }
    return false; //column lacks the value
}
//check for Each 3x3 subset of the entire board and return true if 'toBeStored' value is found
function subsetContainsValue(rowIndex, columnIndex, toBeStored, currentBoard) {
    var minRowIndex = rowIndex - (rowIndex % 3);
    var minColumnIndex = columnIndex - (columnIndex % 3);
    for (var rowIndex_1 = minRowIndex; rowIndex_1 <= minRowIndex + 2; rowIndex_1++) {
        for (var columnIndex_1 = minColumnIndex; columnIndex_1 <= minColumnIndex + 2; columnIndex_1++) {
            if (currentBoard.generatedBoard[rowIndex_1][columnIndex_1] === toBeStored) {
                return true; //row/column of subset has the value
            }
        }
    }
    return false; //subset lacks the value
}
/*
 Created this function to check the 3x3 segment but fails if the overall array size is > 3x3.
 Can make use of this if I get time to provide the use a option to set d board size and use it if size is 3. Quicker.
 */
function segmentContainsValue(segmentArray, toBeStored) {
    return segmentArray.some(function (row) { return row.includes(toBeStored); });
}
// Inject the potential Candidate 'toBeStored' into the current board by making a replica of it.
function injectPotentialCandidate(toBeStored, row, column, currentBoard) {
    // Creating a clone with the potential Candidate 'toBeStored' in its rightful location
    var clonedBoard = new Array();
    // making use of Deep copy to prevent any changes in original be reflected in my clone.
    for (var r = 0; r < currentBoard.BOARD_SIZE; r++) {
        clonedBoard[r] = __spreadArrays(currentBoard.generatedBoard[r]);
    }
    // traverse through each row's column and place the potential candidate else store the existing value from our current board
    var targetRow = new Array();
    for (var c = 0; c < currentBoard.BOARD_SIZE; c++) {
        if (c == column) {
            targetRow[c] = toBeStored;
        }
        else {
            targetRow[c] = currentBoard.generatedBoard[row][c];
        }
    }
    clonedBoard[row] = targetRow;
    return new GenerateTemplate(clonedBoard, currentBoard.BOARD_SIZE);
}
/*
 Takes the current version of the board and stores the potential candidate in its clone and
 sends it back to be used as the current version of the board until all potentialCandidates are in their rightful place on the Sudoku board.
 */
var GenerateTemplate = /** @class */ (function () {
    function GenerateTemplate(generatedBoard, boardLength) {
        this.generatedBoard = generatedBoard;
        this.boardLength = boardLength;
        this.BOARD_SIZE = boardLength;
    }
    return GenerateTemplate;
}());
//Generates an array of random numbers in between 1-9 inclusive
function randomArrayGenerator() {
    var entries = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var randomArray = [];
    for (var tempArr = entries, i = tempArr.length; i--;) {
        var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        randomArray.push(random);
    }
    return randomArray;
}
module.exports = /** @class */ (function () {
    function SudokuValues(initBoard, boardSize) {
        this.initBoard = initBoard;
        this.boardSize = boardSize;
        var initialBoard = new GenerateTemplate(initBoard, boardSize);
        var randomArray = randomArrayGenerator();
        var finalBoard = populateBoardCandidates(initialBoard, randomArray);
        if (finalBoard !== null) {
            this._sudokuBoard = finalBoard;
        }
    }
    SudokuValues.prototype.finalSudukoBoard = function () {
        return this._sudokuBoard;
    };
    return SudokuValues;
}());
//# sourceMappingURL=SudokuValues.js.map