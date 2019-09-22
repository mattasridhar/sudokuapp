import { Component } from '@angular/core';
import { AppService } from './app.service';
import { appRequestSchema, appResponseSchema } from './appSchema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'sudokuBoard';
  message: string = "Sudoku, (originally called Number Place) is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called 'boxes', 'blocks', or 'regions') contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.";
  BOARD_SIZE: number = 9;
  result: appResponseSchema;
  showSpinner: Boolean = true;
  disableReload: Boolean = true;
  selectedCellId: string = "";
  previousCellId: string = "";
  values: number[][];
  reloadBtn;
  selectedCellInfo:appRequestSchema = {
    rowIndex: -1,
    columnIndex: -1,
    value: -1,
    boardSize: this.BOARD_SIZE
  };
  selectedCellValue: number = -1;
  hasBoard: Boolean = false;

  constructor(private appService: AppService) { }

  //initialize the board with default values but following the rules
  ngOnInit() {
    this.reloadBtn = document.getElementById("reloadBtn");
    this.toggleReloadButton(false);
    this.loadDefaultSudokuBoard();
  }

  //load the board in default mode i.e. no cell is selected
  loadDefaultSudokuBoard() {
    this.appService.getBoardData(this.BOARD_SIZE)
      .subscribe(result => {
        console.log(JSON.stringify(result));
        this.result = result;
        this.values = this.result.board;
        if (this.values.length > 0) {
          this.hasBoard = true;
          this.hideSpinner(true);
          this.toggleReloadButton(true);
        } else {
          this.hasBoard = false;
        }
      });
    this.resetSelectedCellInfo();
  }

  //load the board in non-default mode i.e. passing the selected cell
  loadNonDefaultSudoKuBoard(selectedCellInfo) {
    console.log("SRI loadSudokuNonDefault: " + selectedCellInfo);
    this.appService.getBoardDataWithSelectedCell(selectedCellInfo)
      .subscribe(result => {
        console.log(JSON.stringify(result));
        this.result = result;
        this.values = this.result.board;
        if (this.values.length > 0) {
          this.hasBoard = true;
          this.hideSpinner(true);
          this.toggleReloadButton(true);
        } else {
          this.hasBoard = false;
        }
      });
    this.resetSelectedCellInfo();
  }

  //once the Data is received by the UI, hide the spinner and display the Sudoku board
  hideSpinner(shouldHide) {
    if (shouldHide) {
      document.getElementById("spinner").style.display = "none";
      document.getElementById("sudokuBoardContainer").style.display = "inline-block";
    } else {
      document.getElementById("spinner").style.display = "";
      document.getElementById("sudokuBoardContainer").style.display = "none";
    }

  }

  //detect the selected cell position and the data contained in it
  selectMe(event) {
    const eventTarget = event.target;
    this.selectedCellId = eventTarget.id;
    const sudokuCell = document.getElementById(this.selectedCellId);
    if (this.previousCellId) {
      document.getElementById(this.previousCellId).removeAttribute("readonly");
    }

    //toggling the selected state of the cell
    if (sudokuCell.hasAttribute("readonly")) {
      sudokuCell.removeAttribute("readonly");
    } else {
      sudokuCell.setAttribute("readonly", "");
      this.selectedCellValue = eventTarget.placeholder;
      this.previousCellId = this.selectedCellId;
    }
  }

  //deselect the selected cell
  unSelectMe() {
    if (this.previousCellId) {
      document.getElementById(this.previousCellId).removeAttribute("readonly");
      this.resetSelectedCellInfo();
    }
    //clearing all the selected cell info
    this.previousCellId = this.selectedCellId = "";
  }

  // Everytime the Board is refreshed, enable the button. Disable it while the Board loads
  toggleReloadButton(showBtn) {
    if (showBtn) {
      this.reloadBtn.classList.remove("disabled");
      this.reloadBtn.classList.remove("btn-danger");
      this.reloadBtn.classList.add("btn-success");
    } else {
      this.reloadBtn.classList.remove("btn-success");
      this.reloadBtn.classList.add("disabled");
      this.reloadBtn.classList.add("btn-danger");
    }
  }

  //reset the indices stored for the selected cell
  resetSelectedCellInfo() {
    this.selectedCellInfo = {
      rowIndex: -1,
      columnIndex: -1,
      value: -1,
      boardSize: this.BOARD_SIZE
    };
  }

  //reload the board when Reload button is clicked
  reloadBoard() {
    const cellId = this.selectedCellId;

    if (cellId) {
      const indices = cellId.split("");
      this.selectedCellInfo.rowIndex = +indices[0];//unary + because its the fastest
      this.selectedCellInfo.columnIndex = +indices[1];
      this.selectedCellInfo.value = this.selectedCellValue;
    }

    this.hideSpinner(false);
    //Call the default service to load all values else call the selected cell Service
    if (this.selectedCellInfo.value === -1) {
      this.loadDefaultSudokuBoard();
    } else {
      this.loadNonDefaultSudoKuBoard(this.selectedCellInfo);
      //clear what was stored
      this.resetSelectedCellInfo();
    }

    if (this.previousCellId) {
      document.getElementById(this.previousCellId).removeAttribute("readonly");
    }
  }

  //handling the error dialog box. Let's really really wish we never have to see this CAUTION box but Just to be on the safe side, let's have him as well.
  //Reload the board by calling server again.
  closeError() {
    this.loadDefaultSudokuBoard();
  }
}
