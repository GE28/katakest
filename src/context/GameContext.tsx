import { createContext, useContext, JSX } from "solid-js";
import useGame from "@logic/useGame";

const GameContext = createContext<ReturnType<typeof useGame>>();

interface ProviderProps {
  children: JSX.Element;
}

export const GameProvider = (props: ProviderProps) => {
  const game = useGame();
  return (
    <GameContext.Provider value={game}>{props.children}</GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
