import { useDispatch, useSelector } from "react-redux";
import { startGame, openCell, toggleFlag } from "../../store/gameSlice";
import styles from "./Game.module.scss"
import Board from "../Board/Board";
import Button from "../Button/Button";
import { useEffect } from "react";

const Game = () => {
  const dispatch = useDispatch();

  const { board, isGameOver, isWin } = useSelector(state => state.game);

  useEffect(() => {
    dispatch(startGame())
  }, []);

  return (
    <div className={styles.game}>
      <Button onClick={() => dispatch(startGame())} className={styles.reset}>
        Нова гра
      </Button>
      <Board board={board}
        onCellClick={(r, c) => dispatch(openCell({ row: r, col: c }))}
        onCellRightClick={(r, c) => dispatch(toggleFlag({ row: r, col: c }))} />
      {isGameOver && <div>Ви програли... :(</div>}
      {isWin && <div>Ви виграли!</div>}
    </div>
  );
};

export default Game;