import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import StartGameForm from "../../components/StartGameForm/StartGameForm";
import Button from "../../components/Button/Button";
import { clearUser } from "../../store/userSlice";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.appTitle}>Сапер</h1>

      {!user.isRegistered ? (
        <StartGameForm />
      ) : (
        <>
          <p className={styles.greeting}>Привіт, {user.name}</p>

          <Link className={styles.link} to="/game">
            Почати гру
          </Link>

          <Link className={styles.link} to="/settings">
            Налаштування
          </Link>
          <Button className={styles.exit} onClick={() => { dispatch(clearUser()) }}>Вийти</Button>
        </>
      )}
    </div>
  );
};

export default Home;