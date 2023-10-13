import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const GamePlayScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임플레이화면</Text>
    </View>
  );
};

GamePlayScreen.propTypes = {};

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

export default GamePlayScreen;
