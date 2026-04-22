import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [ROWS, setRows] = useState(10);
  const [COLS, setCols] = useState(10);
  const [MINES, setMines] = useState(10);

  return (
    <GameContext.Provider
      value={{
        ROWS,
        COLS,
        MINES,
        setRows,
        setCols,
        setMines,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
