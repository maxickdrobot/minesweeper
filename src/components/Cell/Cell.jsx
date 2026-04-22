import styles from "./Cell.module.scss";

const Cell = ({ cell, onClick, onRightClick }) => {
  const getContent = () => {
    if (!cell.isOpen) return "";
    return cell.adjacentMines || "";
  };

  const isDark = (cell.row + cell.col) % 2 === 0;

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      className={`${styles.cell} ${cell.isOpen ? styles.open : ""} ${
        isDark ? styles.dark : styles.light
      }`}
    >
      {getContent()}

      <div className={`${cell.isFlagged ? styles.flag : ""}`}></div>
      <div className={`${cell.isMine && cell.isOpen ? styles.mine : ""}`}></div>
    </div>
  );
};

export default Cell;
