"use strict";
// A Sudoku puzzle is a 9x9 matrix of marks 1...9, with 0 denoting an empty square
var SudokuEx = /** @class */ (function () {
    function SudokuEx(matrix) {
        this.matrix = matrix;
    }
    // Return the value at the specified (row, column)
    SudokuEx.prototype.markAt = function (row, col) {
        return this.matrix[row][col];
    };
    // Display the contents of the board
    SudokuEx.prototype.print = function () {
        for (var row = 0; row < 9; ++row) {
            var rowString = "";
            for (var col = 0; col < 9; ++col) {
                var mark = this.markAt(row, col);
                if (1 <= mark && mark <= 9) {
                    rowString = rowString + mark;
                }
                else {
                    rowString = rowString + ".";
                }
            }
            console.log(rowString);
        }
    };
    // Create a copy of a Sudoku with an additional mark
    SudokuEx.prototype.copyWithMark = function (mark, row, col) {
        var result = new Array();
        // Copy existing rows
        for (var r = 0; r < 9; ++r) {
            result[r] = this.matrix[r];
        }
        // Replace marked row
        var newRow = new Array();
        for (var c = 0; c < 9; ++c) {
            if (c == col) {
                newRow[c] = mark;
            }
            else {
                newRow[c] = this.matrix[row][c];
            }
        }
        result[row] = newRow;
        return new SudokuEx(result);
    };
    return SudokuEx;
}());
// A (row, column) tuple
var RowCol = /** @class */ (function () {
    function RowCol(row, col) {
        this.row = row;
        this.col = col;
    }
    return RowCol;
}());
// Find a solution for a sudoku puzzle
//
// Returns null if there is no solution
function solveSudoku(s) {
    var emptySquare = findEmptySquare(s);
    if (emptySquare != null) {
        var row = emptySquare.row;
        var col = emptySquare.col;
        for (var mark = 1; mark <= 9; ++mark) {
            if (canTryMark(mark, row, col, s)) {
                var candidate = s.copyWithMark(mark, row, col);
                var solution = solveSudoku(candidate);
                if (solution != null) {
                    return solution;
                }
            }
        }
        // No solution
        return null;
    }
    else {
        // No empty squares, so it's solved
        return s;
    }
}
// Find an empty square in a Sudoku board
//
// Returns (row, column), or null if there are no empty squares
function findEmptySquare(s) {
    for (var row = 0; row < 9; ++row)
        for (var col = 0; col < 9; ++col)
            if (s.markAt(row, col) == 0)
                return new RowCol(row, col);
    return null;
}
// Determine whether putting the specified mark at the specified square would violate uniqueness constrains
function canTryMark(mark, row, col, s) {
    return !doesSudokuContainMarkInRow(s, mark, row)
        && !doesSudokuContainMarkInColumn(s, mark, col)
        && !doesSudokuContainMarkIn3x3Box(s, mark, row, col);
}
// Determine whether a specified mark already exists in a specified row
function doesSudokuContainMarkInRow(s, mark, row) {
    for (var col = 0; col < 9; ++col)
        if (s.markAt(row, col) == mark)
            return true;
    return false;
}
// Determine whether a specified mark already exists in a specified column
function doesSudokuContainMarkInColumn(s, mark, col) {
    for (var row = 0; row < 9; ++row)
        if (s.markAt(row, col) == mark)
            return true;
    return false;
}
/// Determine whether a specified mark already exists in a specified 3x3 subgrid
function doesSudokuContainMarkIn3x3Box(s, mark, row, col) {
    var boxMinRow = Math.floor(row / 3) * 3;
    var boxMaxRow = boxMinRow + 2;
    var boxMinCol = Math.floor(col / 3) * 3;
    var boxMaxCol = boxMinCol + 2;
    for (var row = boxMinRow; row <= boxMaxRow; ++row)
        for (var col = boxMinCol; col <= boxMaxCol; ++col)
            if (s.markAt(row, col) == mark)
                return true;
    return false;
}
module.exports = /** @class */ (function () {
    function Sudoku(matrix) {
        this.matrix = matrix;
        var example = new SudokuEx(matrix);
        console.log("Puzzle:");
        example.print();
        var solution = solveSudoku(example);
        if (solution !== null) {
            console.log("\nSolution:");
            solution.print();
        }
        else {
            console.log("No solution");
        }
    }
    return Sudoku;
}());
//# sourceMappingURL=SudokuEx.js.map