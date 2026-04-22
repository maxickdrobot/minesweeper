import Cell from "../Cell/Cell";
import styles from "./Board.module.scss";

const Board = (props) => {
  const { board, onCellClick, onCellRightClick } = props;

  const handleClick = (e, rowIndex, colIndex) => {
    e.preventDefault();
    onCellRightClick(rowIndex, colIndex);
  };

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onRightClick={(e) => handleClick(e, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
