import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const Sample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sample</Text>
    </View>
  );
};
// let jsonData = [
//   { id: 1, name: '101호', code: '55501' },
//   { id: 2, name: '102호', code: '53521' },
//   { id: 3, name: '103호', code: '93991' },
// ];

Sample.propTypes = {};

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

export default Sample;
