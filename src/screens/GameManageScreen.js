import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

const GameManageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임진행자화면</Text>
    </View>
  );
};

GameManageScreen.propTypes = {};

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

export default GameManageScreen;
