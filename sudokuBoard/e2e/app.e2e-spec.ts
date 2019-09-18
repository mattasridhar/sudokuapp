import { SudokuBoardPage } from './app.po';

describe('sudoku-board App', function() {
  let page: SudokuBoardPage;

  beforeEach(() => {
    page = new SudokuBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
