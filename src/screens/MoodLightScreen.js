import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const MoodLightScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>개별 조명 제어</Text>
    </View>
  );
};

MoodLightScreen.propTypes = {};

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

export default MoodLightScreen;
