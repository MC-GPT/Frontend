import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GameListScreen from '../screens/GameListScreen';
import ElectronicScreen from '../screens/ElectronicScreen';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';
import SettingsScreen from '../screens/SettingsScreen';

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
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
          tabBarActiveTintColor: PRIMARY.DARK,
          tabBarInactiveTintColor: PRIMARY.LIGHT,
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameListScreen}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'game-controller' }),
          tabBarActiveTintColor: PRIMARY.DARK,
          tabBarInactiveTintColor: PRIMARY.LIGHT,
        }}
      />
      <Tab.Screen
        name="Electronics"
        component={ElectronicScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'bulb' }),
          tabBarActiveTintColor: PRIMARY.DARK,
          tabBarInactiveTintColor: PRIMARY.LIGHT,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'settings' }),
          tabBarActiveTintColor: PRIMARY.DARK,
          tabBarInactiveTintColor: PRIMARY.LIGHT,
        }}
      />
    </Tab.Navigator>
  );
};

export default ContentTab;
