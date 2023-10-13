import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const ElectroInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>개별 가전 제어</Text>
    </View>
  );
};

ElectroInfoScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default ElectroInfoScreen;
