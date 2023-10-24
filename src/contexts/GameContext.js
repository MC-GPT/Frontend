import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game_Id, setGameId] = useState('');

  return (
    <GameContext.Provider
      value={{
        game_Id,
        setGameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export const useGameContext = () => useContext(GameContext);

export default GameContext;
