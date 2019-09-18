import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getBoardData(){
    return this.http.get('http://sudoku.com/sudoku/board')
    .pipe(
      map(
        (res: Response) => res.json()
      )
    )
  }

}
