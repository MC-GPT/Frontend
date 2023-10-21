//import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <UserProvider>
      <MainProvider>
        <Navigation />
      </MainProvider>
    </UserProvider>
  );
};

export default App;
