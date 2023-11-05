import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GameListScreen from '../screens/GameListScreen';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import Appliances from './Appliances';

const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}-outline`;
  return <Ionicons name={iconName} size={size} color={color} />;
};

const ContentTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#32276B',
        tabBarInactiveTintColor: '#5C46B2',
        tabBarStyle: { backgroundColor: 'white', height: 88 },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="Appliances"
        component={Appliances}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'ios-apps' }),
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameListScreen}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'game-controller' }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'settings' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default ContentTab;
