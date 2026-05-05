import { useDispatch, useSelector } from "react-redux";
import { setSettings, startGame } from "../../store/gameSlice";
import { Link } from "react-router-dom";
import styles from "./Settings.module.scss";
import Input from "../../components/Input/Input";
import { useState } from "react";
import Button from "../../components/Button/Button";

const Settings = () => {
  const dispatch = useDispatch();

  const { rows, cols, mines } = useSelector(state => state.game);

  const [localRows, setLocalRows] = useState(rows);
  const [localCols, setLocalCols] = useState(cols);
  const [localMines, setLocalMines] = useState(mines);

  const applySettings = () => {
    const maxMines = localRows * localCols - 1;

    if (localMines > maxMines) {
      alert("Занадто багато мін!");
      return;
    }

    dispatch(setSettings({
      rows: localRows,
      cols: localCols,
      mines: localMines
    }));

    dispatch(startGame());
  };

  return (
    <div className={styles.settings}>
      <Link className="backBtn" to="/">
        {"<-- Назад"}
      </Link>

      <h2>Налаштування</h2>

      <Input
        label="Рядки:"
        type="number"
        value={localRows}
        onChange={(e) => setLocalRows(+e.target.value)}
        max={100}
      />

      <Input
        label="Колонки:"
        type="number"
        value={localCols}
        onChange={(e) => setLocalCols(+e.target.value)}
        max={100}
      />

      <Input
        label="Міни:"
        type="number"
        value={localMines}
        onChange={(e) => setLocalMines(+e.target.value)}
        max={2000}
      />

      <Button onClick={applySettings}>
        Застосувати
      </Button>
    </div>
  );
};

export default Settings;