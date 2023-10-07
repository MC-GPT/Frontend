import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, room, setRoom }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node,
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
