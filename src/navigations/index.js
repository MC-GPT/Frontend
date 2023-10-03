import { NavigationContainer } from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import ContentTab from './ContentTab';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? <ContentTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
