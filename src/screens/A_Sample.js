import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const Sample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sample</Text>
    </View>
  );
};

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
