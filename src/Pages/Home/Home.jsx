import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <h1 className={styles.appTitle}>Сапер</h1>
      <Link className={styles.link} to="/game">
        Почати гру
      </Link>

      <Link className={styles.link} to="/settings">
        Налаштування
      </Link>
    </div>
  );
};

export default Home;
