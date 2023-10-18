import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState('');
  const [nickname, setNickname] = useState('');
  const [jwt, setJwt] = useState('');

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        account, 
        setAccount,
        nickname,
        setNickname,
        jwt, // 로그인 시, 매 요청마다 header 에 포함해서 보내야함
        setJwt
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
