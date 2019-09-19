"use strict";
module.exports = /** @class */ (function () {
    /*
    _board.push([3,4,5]); ==> 0th row
    _board.push([6,7,8]); ==> 1st row
    _board.push([1,2,3]); ==> 2nd row

    so _board[1][2] ==> 8 and _board[2][0] ==> 1
    */
    function SudokuValues(row, col, value) {
        this._board = new Array();
        this._toBeReplaced = 0; //value to be replaced in sudokuBoard
        this._BOARD_LENGTH = 9;
        this._partBoard = new Array(); //for storing 3x3 _board entries
        this.cnt = 0;
        this._sudokuBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 4, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this._row = row;
        this._col = col;
        this._value = value;
        this._board = this._sudokuBoard;
        //TODO: put a replace method here if we have row/col/value
        console.log("SRI rowContains: " + this._rowContainsValue(2, 2));
        console.log("SRI columnContains: " + this._columnContainsValue(2, 2));
        console.log("SRI isPotentialCandidate: " + this._isPotentialCandidate(2, 2, 22));
    }
    //returns true if 'toBeStored' is found in the specific row
    SudokuValues.prototype._rowContainsValue = function (rowIndex, toBeStored) {
        // console.log(this._board[rowIndex])
        if (this._board[rowIndex].indexOf(toBeStored) !== -1) {
            return true;
        }
        return false;
    };
    //returns true if 'toBeStored' is found in the specific column
    SudokuValues.prototype._columnContainsValue = function (columnIndex, toBeStored) {
        this._checkColArray = [];
        for (var r = 0; r < this._BOARD_LENGTH; r++) {
            if (this._board[r].length > 0) {
                this._checkColArray.push(this._board[r][columnIndex]);
            }
        }
        // console.log(this._checkColArray);
        if (this._checkColArray.indexOf(toBeStored) !== -1) {
            return true; //column lacks the 'toBeStored' Value
        }
        return false; //column has the value
    };
    //check for Each 9x9 matrix chunk of the board and return true if 'toBeStored' value is found
    SudokuValues.prototype._matrixContainsValue = function (rowIndex, columnIndex, toBeStored) {
        var matrixRow = rowIndex - (rowIndex % 3);
        var matrixColumn = columnIndex - (columnIndex % 3);
        var found = false;
        loop1: for (var r = matrixRow; (r < (matrixRow + 3) && r < this._BOARD_LENGTH); r++) {
            for (var c = matrixColumn; (c < (columnIndex + 3) && c < this._BOARD_LENGTH); c++) {
                // console.log("\t[r][c]: [" + r + "][" + c + "]");
                // console.log("\tthis._board[" + r + "][" + c + "]: " + this._board[r][c]);
                // console.log("\tthis._board[r][c]: " + this._board[r][c]);
                // console.log("\ttoBeStored: " + toBeStored);
                // console.log("\t(this._board[r][c] === toBeStored): " + (this._board[r][c] === toBeStored));
                if (this._board[r][c] === 0) {
                    break;
                }
                else if (this._board[r][c] === toBeStored) {
                    // console.log("\tthis._board[" + r + "][" + c + "]: " + this._board[r][c]);
                    // console.log("GOTCHA BREAK ME!!!!!!!!");
                    found = true;
                    break loop1;
                }
            }
        }
        // console.log("FOUNDme?: " + found + "\n");
        return found;
    };
    //Verify if the 'toBeStored' value is a potential candidate or not for the specific cell
    SudokuValues.prototype._isPotentialCandidate = function (rowIndex, columnIndex, toBeStored) {
        return !this._rowContainsValue(rowIndex, toBeStored) && !this._columnContainsValue(columnIndex, toBeStored) && !this._matrixContainsValue(rowIndex, columnIndex, toBeStored);
    };
    //create the Sudoku board with potential values. 
    //making use of Backtracking Algorithm in a recursive manner. Reference: https://www.tutorialspoint.com/introduction-to-backtracking-algorithms
    SudokuValues.prototype._populateBoardValues = function () {
        for (var r = 0; r < this._BOARD_LENGTH; r++) {
            for (var c = 0; c < this._BOARD_LENGTH; c++) {
                //replace all 'toBeReplaced' locations
                if (this._board[r][c] === this._toBeReplaced) {
                    //trying all potential values in our range
                    for (var toBeStored = 1; toBeStored <= this._BOARD_LENGTH; toBeStored++) {
                        // console.log("toBeStored: " + toBeStored);
                        if (this._isPotentialCandidate(r, c, toBeStored)) {
                            console.log("AM IN!!!!:   ");
                            this._board[r][c] = toBeStored;
                            //Backtracking
                            if (this._populateBoardValues()) {
                                console.log("TRUE IN!!!!:   " + this.cnt++);
                                return true;
                            }
                            else {
                                this._board[r][c] = this._toBeReplaced;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    //creates our sudoku board provided no cell was selected in UI
    SudokuValues.prototype.createBoardValues = function () {
        // console.log("SRI Initial Board: ");
        // console.log(this._board);
        this._populateBoardValues();
        console.log("SRI Final Board:");
        console.log(this._board);
        this._board;
    };
    /*//creates our sudoku board provided no cell was selected in UI
    createBoardValues() {
        // console.log(this._sudokuBoard);
        this._board = this._sudokuBoard;//[];//randomArray;
        console.log("SRI row: " + this._row);
        console.log("SRI col: " + this._col);
        console.log("SRI vlaue: " + this._value);
        this._arrayRow = [];
        this._randomGen = [];
        let toBeStored = 1;
        let tracker = 0;//to store the current index of _randomGen array
                
        //running only for row number of times
        for (var r = 0; r < 9; r++) {
            //From the Mozilla Developer Network documentation: Math.floor(Math.random() * (max - min + 1)) + min; where max and min are inclusive
            // running for column number of times
            this._randomGen = this.randomArrayGenerator();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;//randomArray;//
            //console.log("SRI random: " + this._randomGen);
            while (this._arrayRow.length < 9){// && this._randomGen.length > 0) {
                const currentColumn = this._arrayRow.length;//to store the current column index where the insertion will be done
                toBeStored = this._randomGen[tracker];//Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                console.log("SRI tracker: " + tracker + " :toBeStored: " + toBeStored + " :rowContains: " + this._arrayRow.indexOf(toBeStored));
                if ((this._arrayRow.indexOf(toBeStored) === -1)) {//} && (this._columnContainsValue(currIndex, r, toBeStored))) {
                    var colContains = (this._columnContainsValue(currentColumn, r, toBeStored));
                    if (!colContains) {
                        this._arrayRow.push(toBeStored);
                        console.log("SRI arrRow.length: " + this._arrayRow.length);
                        //this._randomGen.splice(tracker, 1);//remove the stored element to avoid repetition.
                        console.log("SRI new RandomArray: " + this._randomGen);
                    }
                        console.log("SRI colConatins: " + colContains + "\n---------\n");

                }
                //reset the tracker
                if(tracker > this._randomGen.length-1){
                    tracker = 0;
                }else{
                    tracker++;
                }
            }
            tracker = 0;
            this._board.push(this._arrayRow);
            toBeStored = 1;
            this._arrayRow = [];
        }
        return this._board;
    }*/
    //Generates an array with random arrangement of the numbers 1-9
    SudokuValues.prototype.randomArrayGenerator = function () {
        var entries = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //[1, 2, 3, 4];//
        var randomArray = [];
        for (var tempArr = entries, i = tempArr.length; i--;) {
            var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            randomArray.push(random);
        }
        console.log("\nSRI RANDOM ARRAY: " + randomArray);
        return randomArray;
    };
    return SudokuValues;
}());
//# sourceMappingURL=SudokuValues.js.map