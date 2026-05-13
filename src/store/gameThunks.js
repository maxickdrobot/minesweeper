import { openCell } from "./gameSlice";
import { addScore } from "./userSlice";

const countOpened = (board) =>
  board.reduce((acc, row) =>
    acc + row.filter(c => c.isOpen).length, 0);

export const openCellThunk = (row, col) => (dispatch, getState) => {
  const { game } = getState();

  const cell = game.board[row]?.[col];

  if (!cell || cell.isOpen || cell.isFlagged || game.isGameOver || game.isWin) {
    return;
  }

  
  const totalCells = game.rows * game.cols;
  const mineDensity = game.mines / totalCells;
  const multiplier = 1 + mineDensity * 5;

  if (cell.isMine) {
    dispatch(openCell({ row, col }));
    dispatch(addScore(Math.floor(-100 * multiplier)));
    return;
  }

  const openedBefore = countOpened(game.board);

  dispatch(openCell({ row, col }));

  const updatedGame = getState().game;

  const openedAfter = countOpened(updatedGame.board);
  const openedNow = openedAfter - openedBefore;

  if (openedNow > 0) {
    const scoreToAdd = Math.floor(openedNow * multiplier);
    dispatch(addScore(scoreToAdd));
  }

  if (updatedGame.isWin) {
    dispatch(addScore(Math.floor(50 * multiplier)));
  }
};