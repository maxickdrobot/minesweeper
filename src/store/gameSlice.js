import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: 10,
  cols: 10,
  mines: 10,
  board: [],
  isGameOver: false,
  isWin: false,
};

const createBoard = (rows, cols, mines) => {
  const board = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        isOpen: false,
        isFlagged: false,
        adjacentMines: 0,
      });
    }
    board.push(row);
  }

  let placed = 0;

  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;

      [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
          if (dx || dy) {
            const nr = r + dx;
            const nc = c + dy;

            if (
              nr >= 0 && nr < rows &&
              nc >= 0 && nc < cols &&
              !board[nr][nc].isMine
            ) {
              board[nr][nc].adjacentMines++;
            }
          }
        });
      });
    }
  }

  return board;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state) {
      state.board = createBoard(state.rows, state.cols, state.mines);
      state.isGameOver = false;
      state.isWin = false;
    },

    openCell(state, action) {
      const { row, col } = action.payload;
      const cell = state.board[row][col];

      if (state.isGameOver || state.isWin || cell.isOpen || cell.isFlagged) return;

      if (cell.isMine) {
        cell.isOpen = true;
        state.isGameOver = true;
        return;
      }

      const floodFill = (r, c) => {
        if (r < 0 || r >= state.rows || c < 0 || c >= state.cols) return;

        const cell = state.board[r][c];
        if (cell.isOpen || cell.isFlagged) return;

        cell.isOpen = true;

        if (cell.adjacentMines === 0) {
          [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
              if (dx || dy) floodFill(r + dx, c + dy);
            });
          });
        }
      };

      floodFill(row, col);

      const hasClosed = state.board.some(row =>
        row.some(cell => !cell.isMine && !cell.isOpen)
      );

      if (!hasClosed) {
        state.isWin = true;
      }
    },

    toggleFlag(state, action) {
      const { row, col } = action.payload;
      const cell = state.board[row][col];

      if (!cell.isOpen) {
        cell.isFlagged = !cell.isFlagged;
      }
    },

    setSettings(state, action) {
      const { rows, cols, mines } = action.payload;
      state.rows = rows;
      state.cols = cols;
      state.mines = mines;
    }
  }
});

export const { startGame, openCell, toggleFlag, setSettings } = gameSlice.actions;
export default gameSlice.reducer;