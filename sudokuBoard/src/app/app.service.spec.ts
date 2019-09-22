import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';

describe('AppService', () => {

  let appService: AppService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let serverURI = 'http://sudoku.com/sudoku/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    injector = getTestBed();
    appService = injector.get(AppService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // test if Service is created properly or not
  it('Valid Service', () => {
    expect(appService).toBeTruthy();
  });

  describe('sudokuBoard', () => {
    // test for the default sudoku board api when no cell is selected
    it('Get Default Suduko Board', async () => {
      const responseBoard = {
        board: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 9, 1, 2, 3, 4, 5, 6],
          [2, 1, 4, 3, 6, 5, 8, 9, 7],
          [3, 6, 5, 8, 9, 7, 2, 1, 4],
          [8, 9, 7, 2, 1, 4, 3, 6, 5],
          [5, 3, 1, 6, 4, 2, 9, 7, 8],
          [6, 4, 2, 9, 7, 8, 5, 3, 1],
          [9, 7, 8, 5, 3, 1, 6, 4, 2]
        ]
      };

      //Checking if we have a valid response with 'board' data being returned
      appService.getBoardData(9).subscribe((response: any) => {
        expect(JSON.stringify(response)).toMatch('board');
        expect(response.board).toBe(responseBoard);
      });

      const req = httpMock.expectOne(`${serverURI}board/9`, 'calling getBoardData GET API');
      expect(req.request.method).toBe("GET");
      req.flush({ board: responseBoard });
    });

    //Test for the sudukoBoard api which is called when one cell is selected
    it('Get Non-Default Suduko Board', () => {
      const responseBoard = {
        board: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 9, 1, 2, 3, 4, 5, 6],
          [2, 1, 4, 3, 6, 5, 8, 9, 7],
          [3, 6, 5, 8, 9, 7, 2, 1, 4],
          [8, 9, 7, 2, 1, 4, 3, 6, 5],
          [5, 3, 1, 6, 4, 2, 9, 7, 8],
          [6, 4, 2, 9, 7, 8, 5, 3, 1],
          [9, 7, 8, 5, 3, 1, 6, 4, 2]
        ]
      };

      const requestBody = {
        rowIndex: 0,
        columnIndex: 0,
        value: 9,
        boardSize: 9
      };

      // Checking if we are getting board data and with the responseBoard format
      appService.getBoardDataWithSelectedCell(requestBody).subscribe((response: any) => {
        expect(JSON.stringify(response)).toMatch('board');
        expect(response.board).toBe(responseBoard);
      });

      const postReq = httpMock.expectOne(`${serverURI}boardCell`, 'calling getBoardDataWithSelectedCell Post API');
      expect(postReq.request.method).toBe("POST");
      postReq.flush({ board: responseBoard });

    });
  });
});