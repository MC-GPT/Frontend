import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PRIMARY, WHITE } from '../colors';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HeaderLeftButton from '../components/HeaderLeftButton';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerLeft: HeaderLeftButton,
        headerTintColor: PRIMARY.DEFAULT,
      }}
    >
      <Stack.Screen
        name={'SignIn'}
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SignUp'}
        component={SignUpScreen}
        options={{
          title: '회원가입',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
