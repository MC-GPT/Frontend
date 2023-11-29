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
  const { setGamePlayId, setGameName } = useGameContext();
  const insets = useSafeAreaInsets();

  const postCreateGame = async (game_id) => {
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
    3: require('../../assets/Mafia.png'),
  };

  useEffect(() => {
    setJsonData(games);
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
            <Text style={styles.title}>
              생성형 AI 게임으로 분위기를 높여보세요
            </Text>
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
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={buttonStyles.text}>{v.name}</Text>
                        {v.gameType === 0 || v.gameType === 1 ? (
                          <Text
                            style={{
                              marginLeft: 20,
                              fontSize: 14,
                              color: '#65676D',
                            }}
                          >
                            powered by GPT 4.0
                          </Text>
                        ) : null}
                        {(v.gameType === 2 || v.gameType === 3) && (
                          <Text
                            style={{
                              marginLeft: 25,
                              fontSize: 14,
                              color: '#65676D',
                            }}
                          >
                            powered by NUGU
                          </Text>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.createButton}>
              <Button
                title={'AI 게임 참가'}
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
    shadowColor: '#D7DE92',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
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
    fontSize: 20,
    marginTop: 50,
    color: 'lightgrey',
    textShadowColor: '#D7DE92',
    textShadowRadius: 1,
  },
  main: {
    flex: 5,
    width: '100%',
    flexDirection: 'column',
  },
  gameButton: {
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
    flex: 1,
    width: 300,
    justifyContent: 'top',
  },
});

export default GameListScreen;
