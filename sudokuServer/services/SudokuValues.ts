export = class SudokuValues {
    row: number;
    col: number;
    value: number;
    board: number[][];

    constructor(row: number, col: number, value: number) {
        this.row = row;
        this.col = col;
        this.value = value;
    }

    createBoardValues() {
        console.log("SRI row: " + this.row);
        console.log("SRI col: " + this.col);
        console.log("SRI vlaue: " + this.value);
    }
}