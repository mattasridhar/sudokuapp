import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  /* 
    Don't know why I decided to opt for `${template-literal}` style but hey!! you never know..
    the url can get long anytime. Then this would spare me the need for tailing + signs 
   */
  private _sudokuUrl = 'http://sudoku.com/sudoku/';

  constructor(private http: HttpClient) { }

  /* 
    Service Call to retrieve the board with the desired size.
    For the time-being, size is always 9 but incase we add the user-selection feature of sizes 
    then this might come in handy
   */
  getBoardData(boardSize) {
    return this.http.get(`${this._sudokuUrl}board/` + boardSize)
      .pipe(
        map(
          (res) => res
        )
      )
  }

  /* 
    Service vall to retrieve the sudoku board with a Cell selected. 
    At the server all other values shall be re-iterated except the selected.
   */
  getBoardDataWithSelectedCell(selectedCellInfo) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._sudokuUrl}boardCell`, selectedCellInfo, { headers: headers })
      .pipe(
        map(
          (res) => res
        )
      )
  }

}
