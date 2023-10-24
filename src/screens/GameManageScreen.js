import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGameContext } from '../contexts/GameContext';

const GameManageScreen = () => {
  const { gameName } = useGameContext();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <View style={styles.gameTitle}>
            <Text style={{ fontSize: 25 }}>게임이름{gameName}</Text>
          </View>
        </View>
        <View style={styles.topRight}>
          <View style={styles.exit}>
            <Pressable>
              <Text style={{ fontSize: 23 }}> 종료 </Text>
            </Pressable>
          </View>
          <View style={styles.next}>
            <Pressable>
              <Text style={{ fontSize: 20 }}> 다음 문서 </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <Text style={{ fontSize: 20 }}>웹소켓</Text>
      </View>
      <View style={styles.bottom}></View>
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
  top: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'aqua',
  },
  topLeft: {
    width: '50%',
    //backgroundColor: 'red',
  },
  gameTitle: {
    //  backgroundColor: 'yellow',
    margin: 20,
    paddingTop: 15,
  },
  topRight: {
    width: '50%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  exit: {
    //   backgroundColor: 'blue',
    paddingTop: 15,
    margin: 10,
  },
  next: {
    //  backgroundColor: 'skyblue',
    marginRight: 10,
  },
  main: {
    flex: 5,
  },
  bottom: {
    flex: 1,
  },
});

export default GameManageScreen;
