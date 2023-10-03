import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ContentTab from './ContentTab';
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
        headerShown: false,
      }}
    >
      <Stack.Screen name={'ContentTab'} component={ContentTab} />
      <Stack.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          title: 'settings',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
