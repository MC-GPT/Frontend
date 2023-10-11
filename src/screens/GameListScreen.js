import { StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';

const GameListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GameScreen</Text>
    </View>
  );
};

GameListScreen.propTypes = {};

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default GameListScreen;
