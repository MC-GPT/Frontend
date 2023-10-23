import { Alert, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/Button';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMainContext } from '../contexts/MainContext';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';

const GameListScreen = ({ navigation }) => {
  const { jwt } = useUserContext();
  const { home_id, games } = useMainContext();
  const [jsonData, setJsonData] = useState([]);

  const postCreateGame = async (game_id) => {
    try {
      const data = await axios.post(
        'http://127.0.0.1:8080/new-game',
        {
          home_id: home_id,
          game_id: game_id
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigation.navigate('GameManage');
    } catch (e) {
      Alert.alert('게임방 생성 실패');
    }
  };

  const postEnterGame = async (game_id) => {
    url = 'http://127.0.0.1:8080/enter-game?home=' + home_id;
    try {
      const data = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if(data.data != null) {
        // 개별 게임방 id context에 저장
        navigation.navigate('GamePlay');
      } else {
        Alert.alert('게임방 생성 실패');
      }
    } catch (e) {
      Alert.alert('게임방 생성 실패');
    }
  };

  useEffect(() => {
    setJsonData(games);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Text style={styles.title}>게임을 선택하세요</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.gameButton}>
            {jsonData.map((v) => {
              return (
                <Button
                  key={v.id}
                  title={v.name}
                  onPress={() => postCreateGame(v.id)}
                  buttonType={ButtonTypes.GAME}
                  styles={buttonStyles}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.createButton}>
            <Button
              title={'입장'}
              onPress={() => postEnterGame(v.id)}
              buttonType={ButtonTypes.GAME}
            ></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

GameListScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 300,
    // backgroundColor: 'black',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 120,
    borderRadius: 20,
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
    color: 'black',
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
    width: 320,
    justifyContent: 'top',
  },
});

export default GameListScreen;
