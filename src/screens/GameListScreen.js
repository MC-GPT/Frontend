import {
  Alert,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/Button';
import PropTypes from 'prop-types';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMainContext } from '../contexts/MainContext';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { useGameContext } from '../contexts/GameContext';

const GameListScreen = ({ navigation }) => {
  const { jwt } = useUserContext();
  const { home_id, games } = useMainContext();
  const [jsonData, setJsonData] = useState([]);
  const { gamePlayId, setGamePlayId, setGameName } = useGameContext();
  const insets = useSafeAreaInsets();

  const postCreateGame = async (game_id, game_name) => {
    console.log(home_id, game_id, game_name, 'home_id, game_id, game_name');
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/new-game',
        {
          home_id: home_id,
          game_id: game_id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (data.data != null) {
        // 개별 게임방 id context에 저장
        setGamePlayId(data.data);
        console.log(gamePlayId);
        console.log('게임방생성완료');
        navigation.navigate('GameManage');
      } else {
        Alert.alert('게임방 생성 실패');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const EnterGame = async () => {
    const url =
      'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/enter-game?home=' +
      home_id;
    try {
      const data = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (data.data != null) {
        // 개별 게임방 id context에 저장
        setGamePlayId(data.data);
        navigation.navigate('GamePlay');
      } else {
        Alert.alert('게임방 입장 실패!');
      }
    } catch (e) {
      Alert.alert('게임방 입장 실패');
    }
  };

  const imageMapping = {
    0: require('../../assets/Disney.png'),
    1: require('../../assets/Geo.png'),
    2: require('../../assets/Gatherup.png'),
  };

  useEffect(() => {
    setJsonData(games);
    console.log(jsonData);
  }, []);

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.wrapper}>
          <View style={styles.top}>
            <Text style={styles.title}>게임 방을 생성하세요</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.gameButton}>
              {jsonData.map((v) => {
                return (
                  <Pressable
                    key={v.id}
                    title={v.name}
                    onPress={() => {
                      setGameName(v.name);
                      postCreateGame(v.id, v.name);
                    }}
                    style={({ pressed }) => [
                      buttonStyles.container,
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        source={imageMapping[v.gameType]}
                        style={buttonStyles.image}
                      />
                      <Text style={buttonStyles.text}>{v.name}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.createButton}>
              <Button
                title={'게임 입장'}
                onPress={() => EnterGame()}
                buttonType={ButtonTypes.GAME}
              ></Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

GameListScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 300,
    height: 80,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    paddingLeft: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {},
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 30,
    marginTop: 25,
    color: 'white',
  },
  main: {
    flex: 5,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
  },
  gameButton: {
    // backgroundColor: 'aqua',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 35,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    // backgroundColor: 'black',
    flex: 1,
    width: 300,
    justifyContent: 'top',
  },
});

export default GameListScreen;
