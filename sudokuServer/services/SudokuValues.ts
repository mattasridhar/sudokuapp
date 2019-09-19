export = class SudokuValues {
    private _row: number;
    private _col: number;
    private _value: number;
    private _board: number[][] = new Array();
    private _arrayRow; //for storing _board row entries
    private _randomGen; // array for storing the randomly generated numbers
    private _checkColArray; //for storing _board column entries for checking whether the value is contained or not
    private _partBoard: number[][] = new Array(); //for storing 3x3 _board entries

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
    }

    //creates our sudoku board provided no cell was selected in UI
    createBoardValues() {
        this._board = [];//randomArray;
        /*console.log("SRI row: " + this._row);
        console.log("SRI col: " + this._col);
        console.log("SRI vlaue: " + this._value);*/
        this._arrayRow = [];
        this._randomGen = [];
        var toBeStored = 1;
        var c = 0;//for tracking column consists of the toBeStored Value
        //running only for row number of times
        for (var r = 0; r < 4; r++) {
            //From the Mozilla Developer Network documentation: Math.floor(Math.random() * (max - min + 1)) + min; where max and min are inclusive
            // running for column number of times
            this._randomGen = this.randomArrayGenerator();//randomArray;//
            //console.log("SRI random: " + this._randomGen);
            while (this._arrayRow.length < 4) {
                toBeStored = this._randomGen[this._arrayRow.length];//Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                console.log("SRI toBeStored: " + toBeStored + " :rowContains: " + this._arrayRow.indexOf(toBeStored));
                // if ((this._arrayRow.indexOf(toBeStored) === -1) && (this._columnContainsValue(this._arrayRow.length, r, toBeStored))) {
                console.log("SRI colConatins: " + (this._columnContainsValue(this._arrayRow.length, r, toBeStored)) + "\n---------\n");
                this._arrayRow.push(toBeStored);
                // }
            }
            this._board.push(this._arrayRow);
            toBeStored = 1;
            this._arrayRow = [];
        }
        return this._board;
    }

    //Generates an array with random arrangement of the numbers 1-9
    private randomArrayGenerator() {
        const entries = [1, 2, 3, 4];//[1, 2, 3, 4, 5, 6, 7, 8, 9];
        let randomArray = [];
        for (var tempArr = entries, i = tempArr.length; i--;) {
            var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            randomArray.push(random);
        }
        console.log("\nSRI RANDOM ARRAY: " + randomArray);
        return randomArray;
    }

    private _columnContainsValue(columnIndex: number, rowCount: number, toBeStored: number) {
        // console.log("SRI columnIndex: " + columnIndex + "\tSRI rowCnt: " + rowCount + "\tSRI brd: " + this._board);

        // console.log("SRI rowCnt: " + rowCount);
        // console.log("SRI brd.length: " + this._board.length);
        console.log("\tSRI board: " + this._board);
        // var tempStr = "";
        this._checkColArray = [];
        // if (this._board.length > 0) {
        for (var r = 0; r < rowCount; r++) {
            // for (var c = 0; c < 9; c++) {
            // console.log("J:  " + j + " :K: " + k + " _board[" + j + "][" + k + "]: " + this._board[j][k]);
            // console.log("SRI brd[" + r + "].length: " + this._board[r].length);
            if (this._board[r].length > 0) {
                // tempStr = tempStr + this._board[r][columnIndex] + ",";
                this._checkColArray.push(this._board[r][columnIndex]);
            }
            // }
        }

        // console.log("SRI _chkColArr: " + this._checkColArray + " ::: IndexChkCol: " + this._checkColArray.indexOf(toBeStored) + " ::toBeStored: " + toBeStored);

        console.log("\tchkColArr has?: " + this._checkColArray.indexOf(toBeStored) + " ::CheckColArray: " + this._checkColArray);
        // tempStr = "";
        // }
        // console.log("SRI exitin colContainsValue \n");

        if (this._checkColArray.indexOf(toBeStored) === -1) {
            return true;
        } else {
            return false;
        }


    }
}