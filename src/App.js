//import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations';
import { RoomProvider } from './contexts/RoomContext';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <UserProvider>
      <RoomProvider>
        <MainProvider>
          <Navigation />
        </MainProvider>
      </RoomProvider>
    </UserProvider>
  );
};

export default App;
