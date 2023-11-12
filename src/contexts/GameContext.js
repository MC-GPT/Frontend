import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gamePlayId, setGamePlayId] = useState('');
  const [gameName, setGameName] = useState('');
  return (
    <GameContext.Provider
      value={{
        gamePlayId,
        setGamePlayId,
        gameName,
        setGameName,
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
