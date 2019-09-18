"use strict";
module.exports = /** @class */ (function () {
    function SudokuValues(row, col, value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }
    SudokuValues.prototype.createBoardValues = function () {
        console.log("SRI row: " + this.row);
        console.log("SRI col: " + this.col);
        console.log("SRI vlaue: " + this.value);
    };
    return SudokuValues;
}());
//# sourceMappingURL=SudokuValues.js.map