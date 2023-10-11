import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ElectronicScreen from '../screens/ElectronicScreen';
import LightningScreen from '../screens/LigtningScreen';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function Appliances() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="조명" component={LightningScreen} />
        <Tab.Screen name="가전" component={ElectronicScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
