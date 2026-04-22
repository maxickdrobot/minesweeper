import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Link } from "react-router-dom";
import styles from "./Settings.module.scss";
import Input from "../../components/Input/Input";

const Settings = () => {
  const { ROWS, COLS, MINES, setRows, setCols, setMines } = useContext(GameContext);

  return (
    <div className={styles.settings}>
      <Link className="backBtn" to="/">
        {"<-- Назад"}
      </Link>
      <h2>Налаштування</h2>

      <Input
        label="Рядки: "
        type="number"
        value={ROWS}
        onChange={(e) => setRows(+e.target.value)}
        placeholder="Rows"
        max={100}
      />

      <Input
        label="Колонки: "
        type="number"
        value={COLS}
        onChange={(e) => setCols(+e.target.value)}
        placeholder="Cols"
        max={100}
      />

      <Input
        label="Міни: "
        type="number"
        value={MINES}
        onChange={(e) => setMines(+e.target.value)}
        placeholder="Mines"
        max={2000}
      />
    </div>
  );
};

export default Settings;
