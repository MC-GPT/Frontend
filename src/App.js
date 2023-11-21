import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations';
import { MainProvider } from './contexts/MainContext';
import { GameProvider } from './contexts/GameContext';

const App = () => {
  return (
    <UserProvider>
      <MainProvider>
        <GameProvider>
          <Navigation />
        </GameProvider>
      </MainProvider>
    </UserProvider>
  );
};

export default App;
