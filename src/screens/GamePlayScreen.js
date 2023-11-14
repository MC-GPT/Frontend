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
import { useUserContext } from '../contexts/UserContext';

const GamePlayScreen = () => {
  const { gameName } = useGameContext();
  const [imageSource, setImageSource] = useState('');
  const { gamePlayId } = useGameContext();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [gameStart, setGameStart] = useState(false);
  const { nickname } = useUserContext();

  let ws = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    ws.current = new WebSocket(
      'ws://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/ws/game'
    );

    ws.current.onopen = () => {
      console.log('player 웹소켓 연결 성공!');
      const enterMessage = {
        messageType: 'ENTER',
        roomId: gamePlayId,
        sender: 'player',
        message: '',
      };
      ws.current.send(JSON.stringify(enterMessage));
      console.log(JSON.stringify(enterMessage));
      console.log('enter 메시지 전송 완료');
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('player message:', message);
        if (message[0].startsWith('https')) {
          setGameStart(true);
        }
        setImageSource(message[0]);
        //handleWebSocketMessage(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onerror = (e) => {
      console.log(e.message);
    };

    ws.current.onclose = () => {
      console.log('close');
    };

    return () => {
      ws.current.close();
      console.log('clear');
    };
  }, []);

  // const handleWebSocketMessage = (message) => {
  //   switch (message.type) {
  //     case 'ENTER': {
  //       break;
  //     }
  //     case 'NEXT': {
  //       const nextImageData = message.data.image; // 다음 이미지 데이터를 받아옴
  //       setImageSource(nextImageData);
  //       break;
  //     }
  //     case 'END':
  //       // '종료' 버튼을 눌렀을 때 게임 종료 처리

  //       break;
  //     default:
  //       // 다른 메시지 유형에 대한 처리
  //       break;
  //   }
  // };

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
    console.log('Exit 메시지 전송 완료');
  };

  const sendAnswerRequest = () => {
    const AnswerMessage = {
      messageType: 'ANSWER',
      roomId: gamePlayId,
      sender: 'player',
      message: nickname,
    };
    ws.current.send(JSON.stringify(AnswerMessage));
    console.log('Answer 메시지 전송 완료');
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
            <View style={styles.gameTitle}>
              <Text style={{ fontSize: 25, color: 'white' }}>{gameName}</Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <View style={styles.exit}>
              <Pressable
                onPress={sendExitRequest}
                style={({ pressed }) => [
                  styles.icon_each,
                  pressed && { backgroundColor: 'lightgrey' },
                ]}
              >
                <Text style={{ fontSize: 23, color: 'white' }}> 종료 </Text>
              </Pressable>
            </View>
          </View>
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
              <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="100" height="40" fill="#333" rx="10" />

                <text
                  x="50"
                  y="23"
                  fontSize="16"
                  fill="white"
                  textAnchor="middle"
                >
                  정답 !
                </text>
              </svg>
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
    width: '50%',
    // backgroundColor: 'red',
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
    // backgroundColor: 'blue',
    paddingTop: 15,
    margin: 10,
  },
  main: {
    flex: 5,
    // backgroundColor: 'pink',
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
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 10,
  },
  bottom: {
    flex: 3,
    width: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  answer: {
    flexDirection: 'row',
  },
});

export default GamePlayScreen;
