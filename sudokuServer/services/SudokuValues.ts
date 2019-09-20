export = class SudokuValues {
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
    tracker: number = 0;

    /* private _sudokuBoard: number[][] = [
        [0, 0, 0],
        [0, 0, 0],//[0, 1, 0],
        [0, 0, 0],//[0, 0, 2],
    ]; */
    private _sudokuBoard: number[][] = [
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

    /* private _sudokuBoard: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]; */

    /*
    _board.push([3,4,5]); ==> 0th row
    _board.push([6,7,8]); ==> 1st row
    _board.push([1,2,3]); ==> 2nd row

    so _board[1][2] ==> 8 and _board[2][0] ==> 1
    */

    constructor(row: number, col: number, value: number) {
        this._row = row;
        this._col = col;
        this._value = value;
        this._board = this._sudokuBoard;
        //TODO: put a replace method here if we have row/col/value
        /* console.log("SRI rowContains: " + this._rowContainsValue(2, 2));
        console.log("SRI columnContains: " + this._columnContainsValue(2, 2));
        console.log("SRI isPotentialCandidate: " + this._isPotentialCandidate(2, 2, 22)); */
    }

    //returns true if 'toBeStored' is found in the specific row
    private _rowContainsValue(rowIndex: number, toBeStored: number) {
        if (this._board[rowIndex].indexOf(toBeStored) !== -1) {
            //remove the value already stored in Board
            return true;
        }
        return false;
    }

    //returns true if 'toBeStored' is found in the specific column
    private _columnContainsValue(columnIndex: number, toBeStored: number) {
        this._checkColArray = this._board.map(function (value, index) { return value[columnIndex]; });
        // console.log(this._checkColArray);
        if (this._checkColArray.indexOf(toBeStored) !== -1) {
            return true;//column lacks the 'toBeStored' Value
        }
        return false;//column has the value
    }

    //check for Each 9x9 matrix chunk of the board and return true if 'toBeStored' value is found
    private _matrixContainsValue(rowIndex: number, columnIndex: number, toBeStored: number) {
        const minRow = rowIndex - (rowIndex % 3);
        const minColumn = columnIndex - (columnIndex % 3);
        let found: boolean = false;
        let rowData: number[] = new Array();

        // console.log("\ttoBeStores: " + toBeStored);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rowData.push(this._board[minRow + i][minColumn + j]);
                // let colData = this._board.map(function (value, index) { return value[minColumn + i]; });

            }
            // console.log(rowData);
            // console.log("\t" + colData);
            if ((rowData.indexOf(toBeStored) !== -1)) {// || (colData.indexOf(toBeStored) !== -1)) {
                found = true;//either the row or column of the matrix has value
            }
            rowData = [];
        }


        return found;
    }
    /* private _matrixContainsValue(rowIndex: number, columnIndex: number, toBeStored: number) {
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
    } */

    //Verify if the 'toBeStored' value is a potential candidate or not for the specific cell
    private _isPotentialCandidate(rowIndex: number, columnIndex: number, toBeStored: number) {
        let tmp = !this._matrixContainsValue(rowIndex, columnIndex, toBeStored);
        // console.log(tmp);
        return !this._rowContainsValue(rowIndex, toBeStored) && !this._columnContainsValue(columnIndex, toBeStored) && tmp;// && !this._matrixContainsValue(rowIndex, columnIndex, toBeStored);
    }

    //create the Sudoku board with potential values. 
    //making use of Backtracking Algorithm in a recursive manner. Reference: https://www.tutorialspoint.com/introduction-to-backtracking-algorithms
    private _populateBoardValues() {
        loop1:
        for (let r = 0; r < this._BOARD_LENGTH; r++) {
            this._randomGen = this.randomArrayGenerator();
            // console.log("\nBORAD row BFR: " + this._board[r]);
            this.tracker = 0;
            loop2:
            for (let c = 0; c < this._BOARD_LENGTH; c++) {
                console.log("BFR RANDOM_ARR: " + this._randomGen);
                //replace all 'toBeReplaced' locations
                loop3:
                while (this._randomGen.length !== 0) {

                    if (this._board[r][c] !== this._toBeReplaced) {
                        //remove the value already stored in Board
                        let existValueIndex = this._randomGen.indexOf(this._board[r][c]);
                        console.log("existValIn: " + existValueIndex)
                        // if (existValueIndex > -1) {
                        this._randomGen.splice(existValueIndex, 1);
                        // }

                        this.tracker = 0;
                        console.log("BREAKING loop3 AS VALUE is FIXED: " + this._board[r][c]);
                        //break loop3;//brk while and increement 'c' as value is already fixed
                    }

                    if (this._board[r][c] === this._toBeReplaced) {
                        //trying all potential values in our range
                        if (this._isPotentialCandidate(r, c, this._randomGen[this.tracker])) {
                            console.log("\tPotentialCandidate tracker: " + this.tracker + " randGen[tracker]: " + this._randomGen[this.tracker]);
                            this._board[r][c] = this._randomGen[this.tracker];
                            this._randomGen.splice(this.tracker, 1);
                            this.tracker = 0;
                            break loop3;//brk while increement 'c' if match is found nd value is inserted
                        } else {
                            this.tracker++;
                            // console.log("\tInc K: " + k + " C: " + c);
                            if (this.tracker >= this._randomGen.length) {
                                this.tracker = 0;
                            }
                        }
                    }
                }
                console.log("AFTR RANDOM_ARR: " + this._randomGen);
                // console.log("\trandomGen Index K: " + k + " Board Col Index: " + c);
                console.log("BORAD row AFTR: " + this._board[r] + "\n-----------------------------------------------------\n");
            }
            // console.log(this._board);
        }
    }

    //creates our sudoku board provided no cell was selected in UI
    createBoardValues() {
        // console.log("SRI Initial Board: ");
        // console.log(this._board);
        this._populateBoardValues();
        console.log("\n\nSRI Final Board:");
        console.log(this._board);
        this._board;
    }

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
    private randomArrayGenerator() {
        const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9];//[1, 2, 3, 4];//[1, 2, 3];//
        let randomArray = [];
        for (var tempArr = entries, i = tempArr.length; i--;) {
            var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            randomArray.push(random);
        }
        // console.log("\nSRI RANDOM ARRAY: " + randomArray);
        return randomArray;
    }
}