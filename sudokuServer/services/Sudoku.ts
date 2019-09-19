export = class Sudoku {
    private _row: number;
    private _col: number;
    private _value: number;
    private _board: number[][] = new Array();
    private _toBeReplaced: number = 0;//value to be replaced in sudokuBoard
    private _BOARD_LENGTH: number = 9;
    private _arrayRow; //for storing _board row entries
    private _randomGen; // array for storing the randomly generated numbers
    private _checkColArray; //for storing _board column entries for checking whether the value is contained or not
    private _partBoard: number[][] = new Array(); //for storing 3x3 _board entries
    cnt:number =0;

    private _sudokuBoard: number[][] = [
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

    constructor(row: number, col: number, value: number) {
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
    private _rowContainsValue(rowIndex: number, toBeStored: number) {
        // console.log(this._board[rowIndex])
        if (this._board[rowIndex].indexOf(toBeStored) !== -1) {
            return true;
        }
        return false;
    }

    //returns true if 'toBeStored' is found in the specific column
    private _columnContainsValue(columnIndex: number, toBeStored: number) {
        this._checkColArray = [];
        for (var r = 0; r < this._BOARD_LENGTH; r++) {
            if (this._board[r].length > 0) {
                this._checkColArray.push(this._board[r][columnIndex]);
            }
        }
        // console.log(this._checkColArray);
        if (this._checkColArray.indexOf(toBeStored) !== -1) {
            return true;//column lacks the 'toBeStored' Value
        }

        return false;//column has the value

    }

    //check for Each 9x9 matrix chunk of the board and return true if 'toBeStored' value is found
    private _matrixContainsValue(rowIndex: number, columnIndex: number, toBeStored: number) {
        let matrixRow = rowIndex - (rowIndex % 3);
        let matrixColumn = columnIndex - (columnIndex % 3);
        let found: boolean = false;

        loop1:
        for (let r = matrixRow; (r < (matrixRow + 3) && r < this._BOARD_LENGTH); r++) {
            for (let c = matrixColumn; (c < (columnIndex + 3) && c < this._BOARD_LENGTH); c++) {
                // console.log("\t[r][c]: [" + r + "][" + c + "]");
                // console.log("\tthis._board[" + r + "][" + c + "]: " + this._board[r][c]);
                // console.log("\tthis._board[r][c]: " + this._board[r][c]);
                // console.log("\ttoBeStored: " + toBeStored);
                // console.log("\t(this._board[r][c] === toBeStored): " + (this._board[r][c] === toBeStored));
                if (this._board[r][c] === 0) {
                    break;
                } else if (this._board[r][c] === toBeStored) {
                    // console.log("\tthis._board[" + r + "][" + c + "]: " + this._board[r][c]);
                    // console.log("GOTCHA BREAK ME!!!!!!!!");
                    found = true;
                    break loop1;
                }
            }
        }
        // console.log("FOUNDme?: " + found + "\n");
        return found;
    }

    //Verify if the 'toBeStored' value is a potential candidate or not for the specific cell
    private _isPotentialCandidate(rowIndex: number, columnIndex: number, toBeStored: number) {
        return !this._rowContainsValue(rowIndex, toBeStored) && !this._columnContainsValue(columnIndex, toBeStored) && !this._matrixContainsValue(rowIndex, columnIndex, toBeStored);
    }

    //create the Sudoku board with potential values. 
    //making use of Backtracking Algorithm in a recursive manner. Reference: https://www.tutorialspoint.com/introduction-to-backtracking-algorithms
    private _populateBoardValues() {
        for (let r = 0; r < this._BOARD_LENGTH; r++) {
            for (let c = 0; c < this._BOARD_LENGTH; c++) {
                //replace all 'toBeReplaced' locations
                if (this._board[r][c] === this._toBeReplaced) {
                    //trying all potential values in our range
                    for (let toBeStored = 1; toBeStored <= this._BOARD_LENGTH; toBeStored++) {
                        // console.log("toBeStored: " + toBeStored);
                        if (this._isPotentialCandidate(r, c, toBeStored)) {
                            console.log("AM IN!!!!:   ");
                            this._board[r][c] = toBeStored;
                            //Backtracking
                            if (this._populateBoardValues()) {
                            console.log("TRUE IN!!!!:   " + this.cnt++);
                                return true;
                            } else {
                                this._board[r][c] = this._toBeReplaced;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    //creates our sudoku board provided no cell was selected in UI
    createBoardValues() {
        // console.log("SRI Initial Board: ");
        // console.log(this._board);
        this._populateBoardValues();
        console.log("SRI Final Board:");
        console.log(this._board);
        this._board;
    }

    //Generates an array with random arrangement of the numbers 1-9
    private randomArrayGenerator() {
        const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9];//[1, 2, 3, 4];//
        let randomArray = [];
        for (var tempArr = entries, i = tempArr.length; i--;) {
            var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            randomArray.push(random);
        }
        console.log("\nSRI RANDOM ARRAY: " + randomArray);
        return randomArray;
    }
} 