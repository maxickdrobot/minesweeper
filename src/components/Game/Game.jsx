import { useContext, useState } from "react";
import styles from "./Game.module.scss";
import Board from "../Board/Board";
import Button from "../Button/Button";
import { GameContext } from "../../contexts/GameContext";

const Game = () => {
  const { ROWS, COLS, MINES } = useContext(GameContext);

  const createBoard = () => {
    const board = [];
    for (let row = 0; row < ROWS; row++) {
      const rows = [];
      for (let col = 0; col < COLS; col++) {
        rows.push({
          row,
          col,
          isMine: false,
          isOpen: false,
          isFlagged: false,
          adjacentMines: 0,
        });
      }
      board.push(rows);
    }
    placeMines(board);
    return board;
  };

  const placeMines = (board) => {
    let placedMines = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    while (placedMines < MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);

      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        board[row][col].adjacentMines = 0;
        placedMines++;

        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            !board[newRow][newCol].isMine
          ) {
            board[newRow][newCol].adjacentMines += 1;
          }
        });
      }
    }
  };

  const checkWin = (board) => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = board[row][col];
        if (!cell.isMine && !cell.isOpen) {
          return false;
        }
      }
    }
    return true;
  };

  const openCell = (rowIndex, colIndex) => {
    if (isGameOver || isWin) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    const floodFill = (row, col) => {
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;

      const cell = newBoard[row][col];
      if (cell.isOpen || cell.isFlagged) return;

      cell.isOpen = true;

      setBoard(newBoard.map((row) => row.map((cell) => ({ ...cell }))));

      if (cell.adjacentMines === 0) {
        [-1, 0, 1].forEach((dx) => {
          [-1, 0, 1].forEach((dy) => {
            if (dx !== 0 || dy !== 0) {
              setTimeout(() => {
                floodFill(row + dx, col + dy);
              }, 10);
            }
          });
        });
      }
    };

    const clickedCell = newBoard[rowIndex][colIndex];

    if (clickedCell.isMine) {
      clickedCell.isOpen = true;
      setBoard(newBoard);
      setIsGameOver(true);
      alert("Ви програли... :(");
      return;
    }

    floodFill(rowIndex, colIndex);

    setTimeout(() => {
      if (checkWin(newBoard)) {
        setIsWin(true);
        alert("Ви виграли!");
      }
    }, 50);
  };

  const toggleFlag = (rowIndex, colIndex) => {
    if (isGameOver || isWin) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[rowIndex][colIndex];
    if (!cell.isOpen) cell.isFlagged = !cell.isFlagged;

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setIsGameOver(false);
    setIsWin(false);
  };

  const [board, setBoard] = useState(createBoard());
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  return (
    <div className={styles.game}>
      <Button onClick={resetGame} className={styles.reset}>
        Нова гра
      </Button>
      <Board board={board} onCellClick={openCell} onCellRightClick={toggleFlag} />
      {isGameOver && <div>Ви програли... :(</div>}
      {isWin && <div>Ви виграли!</div>}
    </div>
  );
};

export default Game;
