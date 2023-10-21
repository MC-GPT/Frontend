import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [home_name, setHomeName] = useState('');
  const [apps, setApps] = useState([]);
  const [games, setGames] = useState([]);
  const [owner, setOwner] = useState(false);

  return (
    <MainContext.Provider
      value={{
        home_name,
        setHomeName,
        apps,
        setApps,
        games,
        setGames,
        owner,
        setOwner,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export const useMainContext = () => useContext(MainContext);

export default MainContext;
