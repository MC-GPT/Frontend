import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import ListScreen from '../screens/ListScreen';
import HeaderLeftButton from '../components/HeaderLeftButton';
import HeaderRightButton from '../components/HeaderRightButton';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: '700' },
        headerBackTitleVisible: false,
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name={'List'}
        component={ListScreen}
        options={{
          title: 'Main',
          headerRight: HeaderRightButton,
        }}
      />
      <Stack.Screen name={'Settings'} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
