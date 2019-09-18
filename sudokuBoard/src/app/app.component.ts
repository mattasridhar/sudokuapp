import { Component } from '@angular/core';
import { AppService } from './app.service';
import { appSchema } from './appSchema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService ]
})
export class AppComponent {
  title:String = 'Self Sudoku is Here.';
  result: appSchema;
  showSpinner:Boolean = true;
  values:Number[] = [1,2,3,4];

  constructor( private appService: AppService){}
  
  ngOnInit(){
    console.log("SRI was here");
    this.appService.getBoardData()
    .subscribe( result => {
      this.result = result;
      this.title = this.result.msg;
      this.hideSpinner();
    } 
  );
  }
  
  //once the Data is received by the UI, hide the spinner and display the Sudoku board
  hideSpinner() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("sudokuBoard").style.display = "block";
  }
}
