import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { useGameContext } from '../contexts/GameContext';
import { useEffect, useRef, useState } from 'react';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';

const GamePlayScreen = () => {
  const [imageSource, setImageSource] = useState('');
  const { gamePlayId } = useGameContext();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [gameStart, setGameStart] = useState(false);
  const { jwt, nickname } = useUserContext();

  let ws = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    ws.current = new WebSocket(
      'ws://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/ws/game'
    );

    ws.current.onopen = () => {
      const enterMessage = {
        messageType: 'ENTER',
        roomId: gamePlayId,
        sender: 'player',
        message: '',
      };
      ws.current.send(JSON.stringify(enterMessage));
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message[0].startsWith('https')) {
          setGameStart(true);
        }
        setImageSource(message[0]);
      } catch (error) {
        error;
      }
    };

    ws.current.onerror = () => {};

    ws.current.onclose = () => {};

    return () => {
      ws.current.close();
    };
  }, []);

  const sendExitRequest = () => {
    const exitMessage = {
      messageType: 'EXIT',
      roomId: gamePlayId,
      sender: 'player',
      message: '',
      imageUrls: ['https://www.naver.com/', 'https://www.naver.com/'],
    };
    ws.current.send(JSON.stringify(exitMessage));
    setGameStart(false);
    navigation.goBack();
  };

  const PressAnswer = async () => {
    try {
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/register-serial?roomId=' +
          gamePlayId,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <View style={styles.exit}>
              <Pressable
                onPress={sendExitRequest}
                style={({ pressed }) => [styles.icon_each, pressed && {}]}
              >
                <MaterialIcons name="arrow-back-ios" size={25} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={styles.topMiddle}>
            <View style={styles.gameTitle}>
              <Text style={{ fontSize: 18, color: 'white' }}>
                닉네임 : {nickname}
              </Text>
            </View>
          </View>
          <View style={styles.topRight}></View>
        </View>
        <View style={styles.main}>
          {gameStart ? (
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{ uri: imageSource }} />
            </View>
          ) : (
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
              게임 시작 대기중 . . .
            </Text>
          )}
        </View>
        <View style={styles.bottom}>
          <View style={styles.answer}>
            {gameStart && (
              <Pressable
                onPress={PressAnswer}
                style={({ pressed }) => [
                  styles.ans,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <Image
                  style={styles.gifImage}
                  source={require('../../assets/vote.gif')}
                />
              </Pressable>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

GamePlayScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1.5,
    flexDirection: 'row',
  },
  topLeft: {
    flex: 1,
  },
  gameTitle: {
    marginTop: 30,
  },
  topMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  topRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  exit: {
    paddingTop: 20,
    marginLeft: 20,
  },
  main: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 50,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 10,
  },
  gifImage: {
    borderRadius: 30,
    width: 200,
    height: 200,
  },
  ans: {
    width: 200,
    height: 200,
  },
  bottom: {
    flex: 3,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  answer: {
    flexDirection: 'row',
  },
});

export default GamePlayScreen;
