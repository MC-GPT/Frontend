import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [code, setCode] = useState(null);
  const [room, setRoom] = useState('');
  return (
    <RoomContext.Provider value={{ code, setCode, room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node,
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomContext;
