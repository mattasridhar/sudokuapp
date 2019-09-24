//Entry point for our Sudoku board
export = class SudokuValues {
    private _sudokuBoard;
    constructor(private initBoard: number[][], private boardSize: number) {
        let initialBoard = new GenerateTemplate(initBoard, boardSize);
        let randomArray = randomArrayGenerator();
        let finalBoard = populateBoardCandidates(initialBoard, randomArray);
        if (finalBoard !== null) {
            this._sudokuBoard = finalBoard;
        }
    }

    finalSudukoBoard() {
        return this._sudokuBoard;
    }
}

/* 
 Create the Sudoku board with potential values. 
 Making use of Backtracking Algorithm in a recursive manner. Reference: https://www.tutorialspoint.com/introduction-to-backtracking-algorithms
 */
function populateBoardCandidates(currentBoard: GenerateTemplate, randomArray: number[]): GenerateTemplate {
    let toBePopulated = indexToBePopulated(currentBoard);
    if (toBePopulated.rowIndex !== -1 && toBePopulated.columnIndex !== -1) {
        let row = toBePopulated.rowIndex;
        let column = toBePopulated.columnIndex;
        for (let i = 0; i < 9; i++) {
            let toBeStored = randomArray[i];
            if (isPotentialCandidate(row, column, toBeStored, currentBoard)) {
                let storedValue = injectPotentialCandidate(toBeStored, row, column, currentBoard);
                let updatedBoard = populateBoardCandidates(storedValue, randomArray);
                if (updatedBoard != null) {
                    return updatedBoard;
                }
            }
        }
    }
    else {// all Board cells are populated
        return currentBoard;
    }
}

//returns a Json object with the RowIndex and columnIndex that needs to be populated with potential candidates
function indexToBePopulated(currentBoard: GenerateTemplate) {
    let toBeFilled = {
        rowIndex: -1,
        columnIndex: -1
    };
    for (let row = 0; row < currentBoard.BOARD_SIZE; row++) {
        for (let column = 0; column < currentBoard.BOARD_SIZE; column++) {
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
function isPotentialCandidate(row: number, column: number, toBeStored: number, currentBoard: GenerateTemplate) {
    return !rowContainsValue(row, toBeStored, currentBoard) && !columnContainsValue(column, toBeStored, currentBoard) && !subsetContainsValue(row, column, toBeStored, currentBoard);
}

//returns true if 'toBeStored' is found in the specific row
function rowContainsValue(rowIndex: number, toBeStored: number, currentBoard: GenerateTemplate) {
    if (currentBoard.generatedBoard[rowIndex].indexOf(toBeStored) !== -1) {
        return true;//row has the value
    }
    return false;//row lacks the value
}

//returns true if 'toBeStored' is found in the specific column
function columnContainsValue(columnIndex: number, toBeStored: number, currentBoard: GenerateTemplate) {
    let checkColArray = currentBoard.generatedBoard.map(function (value) { return value[columnIndex]; });
    if (checkColArray.indexOf(toBeStored) !== -1) {
        return true;//column has the 'toBeStored' Value
    }

    return false;//column lacks the value
}

//check for Each 3x3 subset of the entire board and return true if 'toBeStored' value is found
function subsetContainsValue(rowIndex: number, columnIndex: number, toBeStored: number, currentBoard: GenerateTemplate) {
    let minRowIndex = rowIndex - (rowIndex % 3);
    let minColumnIndex = columnIndex - (columnIndex % 3);

    for (let rowIndex = minRowIndex; rowIndex <= minRowIndex + 2; rowIndex++) {
        for (let columnIndex = minColumnIndex; columnIndex <= minColumnIndex + 2; columnIndex++) {
            if (currentBoard.generatedBoard[rowIndex][columnIndex] === toBeStored) {
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
    return segmentArray.some(row => row.includes(toBeStored));
}


// Inject the potential Candidate 'toBeStored' into the current board by making a replica of it.
function injectPotentialCandidate(toBeStored: number, row: number, column: number, currentBoard: GenerateTemplate): GenerateTemplate {
    // Creating a clone with the potential Candidate 'toBeStored' in its rightful location
    let clonedBoard: number[][] = new Array();
    // making use of Deep copy to prevent any changes in original be reflected in my clone.
    for (let r = 0; r < currentBoard.BOARD_SIZE; r++) {
        clonedBoard[r] = [...currentBoard.generatedBoard[r]];
    }

    // traverse through each row's column and place the potential candidate else store the existing value from our current board
    let targetRow: number[] = new Array()
    for (let c = 0; c < currentBoard.BOARD_SIZE; c++) {
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
class GenerateTemplate {
    BOARD_SIZE: number;//setting this value in constructor incase I plan of implementing resizable boards in future
    constructor(public generatedBoard: number[][], private boardLength: number) {
        this.BOARD_SIZE = boardLength;
    }
}

//Generates an array of random numbers in between 1-9 inclusive
function randomArrayGenerator() {
    const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomArray = [];
    for (var tempArr = entries, i = tempArr.length; i--;) {
        var random = tempArr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        randomArray.push(random);
    }
    return randomArray;
}