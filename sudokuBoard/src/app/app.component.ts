import { Component } from '@angular/core';
import { AppService } from './app.service';
import { appSchema } from './appSchema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title: string = 'Self Sudoku is Here.';
  result: appSchema;
  showSpinner: Boolean = true;
  disableReload: Boolean = true;
  selectedCellId: string = "";
  previousCellId: string = "";
  values: Number[] = [0, 1, 2, 3, 4, 6, 7, 8];
  reloadBtn;

  constructor(private appService: AppService) { }

  ngOnInit() {
    console.log("SRI was here");
    this.reloadBtn = document.getElementById("reloadBtn");
    this.toggleReloadButton(false);
    this.loadSudokuBoard();
  }

  loadSudokuBoard() {
    this.appService.getBoardData()
      .subscribe(result => {
        this.result = result;
        this.title = this.result.msg;
        this.hideSpinner(true);
        this.toggleReloadButton(true);
      });
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
    this.selectedCellId = event.target.id;
    const sudokuCell = document.getElementById(this.selectedCellId);
    if (this.previousCellId) {
      document.getElementById(this.previousCellId).removeAttribute("readonly");
    }

    if (sudokuCell.hasAttribute("readonly")) {
      sudokuCell.removeAttribute("readonly");
    } else {
      sudokuCell.setAttribute("readonly", "");
      this.previousCellId = this.selectedCellId;
    }

  }

  //deselct the selected cell
  unSelectMe() {
    if (this.previousCellId) {
      document.getElementById(this.previousCellId).removeAttribute("readonly");
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

  //reload the board when Reload button is clicked
  reloadBoard() {
    console.log(this.selectedCellId);
    this.hideSpinner(false);
    this.loadSudokuBoard();
  }
}
