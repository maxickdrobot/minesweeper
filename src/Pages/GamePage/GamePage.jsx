import { Link } from "react-router-dom";
import Game from "../../components/Game/Game";

const GamePage = () => {
  return (
    <div>
      <Link className="backBtn" to="/">
        {"<-- Назад"}
      </Link>

      <Game />
    </div>
  );
};

export default GamePage;
