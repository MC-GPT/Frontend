import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ElectronicScreen from '../screens/ElectronicScreen';
import LightningScreen from '../screens/LigtningScreen';
import { StyleSheet } from 'react-native';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function Appliances() {
  const insets = useSafeAreaInsets();
  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom - 35 },
        ]}
      >
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#C68CF2',
            tabBarInactiveTintColor: '#D4CADC',
            tabBarIndicatorStyle: { backgroundColor: '#C68CF2' },
            tabBarStyle: { backgroundColor: 'transparent' },
            tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          }}
        >
          <Tab.Screen name="조명" component={LightningScreen} />
          <Tab.Screen name="가전" component={ElectronicScreen} />
        </Tab.Navigator>
      </ImageBackground>
    </SafeInputView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
