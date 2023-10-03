import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { WHITE } from '../colors';

const ElectronicScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ElectronicScreen</Text>
    </View>
  );
};

ElectronicScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 30,
  },
});

export default ElectronicScreen;
