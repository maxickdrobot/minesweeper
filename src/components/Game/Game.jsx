import { useDispatch, useSelector } from "react-redux";
import { startGame, openCell, toggleFlag } from "../../store/gameSlice";
import styles from "./Game.module.scss"
import Board from "../Board/Board";
import Button from "../Button/Button";
import { useEffect } from "react";
import { openCellThunk } from "../../store/gameThunks";

const Game = () => {
  const dispatch = useDispatch();

  const { board, isGameOver, isWin } = useSelector(state => state.game);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(startGame())
  }, [dispatch]);

  return (
    <div className={styles.game}>
      <div className={styles.gamerInfo}>
        <p className={styles.name}>{user.name ?? 0}</p>
        <p className={styles.score}>Score: {user.score ?? 0}</p>
      </div>
      <Button onClick={() => dispatch(startGame())} className={styles.reset}>
        Нова гра
      </Button>
      <Board
        board={board}
        onCellClick={(r, c) => dispatch(openCellThunk(r, c))}
        onCellRightClick={(r, c) =>
          dispatch(toggleFlag({ row: r, col: c }))
        }
      />
      {isGameOver && <div>Ви програли... :(</div>}
      {isWin && <div>Ви виграли!</div>}
    </div>
  );
};

export default Game;