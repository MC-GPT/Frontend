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

const GameManageScreen = () => {
  const { gameName } = useGameContext();
  const [imageSource, setImageSource] = useState('');

  const [gameStart, setGameStart] = useState(false);
  const { gamePlayId } = useGameContext();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { jwt } = useUserContext();

  let ws = useRef(null);

  let geo = [
    {
      answer: '에펠탑',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=48.858844,2.294351&heading=140&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '자유의 여신상',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.689247,-74.044502&heading=10&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '콜로세움',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=41.89021,12.492231&heading=20&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '만리장성',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.431908,116.570374&heading=300&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '베네치아 캐널',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=45.440847,12.315515&heading=170&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '피사의 사탑',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=43.722952,10.396597&heading=230&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '시드니 오페라 하우스',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=-33.856159,151.214234&heading=70&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '피라미드',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=29.977296,31.132495&heading=30&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '타지마할',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=27.175142,78.042442&heading=10&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '기차이쿠',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=35.710063,139.8107&heading=360&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
  ];

  let disney = [
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/0.jpg',
      answer: '수지',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/0.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/1.jpg',
      answer: '아이유',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/1.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/2.jpg',
      answer: '윈터',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/2.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/3.jpg',
      answer: '장원영',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/3.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/4.jpg',
      answer: '제니',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/4.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/5.jpg',
      answer: '해린',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/5.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/6.jpg',
      answer: '윈터',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/6.png',
    },
    {
      real: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/answer/7.jpg',
      answer: '카리나',
      image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/quiz/7.png',
    },
  ];

  let gather = [
    { image: 'https://mc-nugu.s3.ap-northeast-2.amazonaws.com/headphone.jpg' },
  ];

  const [imageIndex, setImageIndex] = useState(0);
  let nextImageData;
  let answerData;

  if (gameName.startsWith('g')) {
    nextImageData = geo[imageIndex];
    answerData = geo[imageIndex - 1];
  } else if (gameName.startsWith('디')) {
    nextImageData = disney[imageIndex];
    answerData = disney[imageIndex - 1];
  } else if (gameName.startsWith('모')) {
    nextImageData = gather[imageIndex];
  } else {
    // dummy
  }

  const [pressed, setPressed] = useState(false);
  const sendConfirmRequest = () => {
    setPressed(true);
  };
  const answerText = pressed ? answerData.answer : '정답 확인';

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ws.current = new WebSocket(
      'ws://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/ws/game'
    );
    ws.current.onopen = () => {
      console.log('웹소켓 연결 성공!');
      const enterMessage = {
        messageType: 'ENTER',
        roomId: gamePlayId,
        sender: gameName,
        message: '',
      };
      ws.current.send(JSON.stringify(enterMessage));
      console.log(JSON.stringify(enterMessage));
      console.log('enter 메시지 전송 완료');
    };

    ws.current.onmessage = (event) => {
      try {
        console.log('event : ', event);
        const message = JSON.parse(event.data);
        console.log('host message : ', message);
        console.log('message[0]:', message[0]);
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

  const sendGameStartRequest = () => {
    setGameStart(true); // 게임 시작 상태를 true로 설정
    setImageIndex((prevIndex) => prevIndex + 1);
    setImageSource(nextImageData.image);
    console.log('nextImageData의 내용은 아래와 같다');
    console.log(nextImageData);
    const nextMessage = {
      messageType: 'NEXT',
      roomId: gamePlayId,
      sender: 'host',
      message: '',
      imageUrls: [nextImageData.image],
    };
    console.log('보내는 next 메세지 내용 : ', nextMessage);
    const answerMessage = {
      messageType: 'ANSWER',
      roomId: gamePlayId,
      sender: 'host',
      message: '',
      imageUrls: [nextImageData.area],
    };
    console.log('보내는 answer 메세지 내용 : ', answerMessage);
    ws.current.send(JSON.stringify(nextMessage, answerMessage));
    console.log(imageIndex);
    console.log('게임 시작 완료');
  };

  const sendNextRequest = () => {
    {
      setPressed(false);
      setImageIndex((prevIndex) => prevIndex + 1);
      setImageSource(nextImageData.image);
      console.log('nextImageData의 내용은 아래와 같다');
      console.log(nextImageData);
      const nextMessage = {
        messageType: 'NEXT',
        roomId: gamePlayId,
        sender: 'host',
        message: '',
        imageUrls: [nextImageData.image],
      };

      try {
        ws.current.send(JSON.stringify(nextMessage));
      } catch (e) {
        console.log(e.message);
      }
      console.log(imageIndex);
      console.log('next message 전송완료');
    }
  };

  const sendAnswerRequest = () => {
    setImageSource(answerData.real);
    const answerMessage = {
      messageType: 'ANSWER',
      roomId: gamePlayId,
      sender: 'host',
      message: '',
      imageUrls: [answerData.real],
    };
    try {
      ws.current.send(JSON.stringify(answerMessage));
    } catch (e) {
      console.log(e.message);
    }
  };

  const sendExitRequest = () => {
    setGameStart(false);
    const exitMessage = {
      messageType: 'EXIT',
      roomId: gamePlayId,
      sender: 'host',
      message: '',
    };
    ws.current.send(JSON.stringify(exitMessage));
    navigation.goBack();
    console.log('Exit 메시지 전송 완료');
  };

  const AnswerOrder = async () => {
    try {
      const data = await axios.post(
        `http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/register-serial?roomId=` +
          gamePlayId,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
    } catch (e) {
      console.error(e);
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
              <Text style={{ fontSize: 27, color: 'white' }}>{gameName}</Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <View style={styles.next}>
              {!gameName.startsWith('모') && (
                <Pressable
                  onPress={gameStart ? sendNextRequest : sendGameStartRequest}
                  style={({ pressed }) => [
                    styles.icon_each,
                    pressed && {
                      backgroundColor: 'lightgrey',
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Text style={{ color: 'black', fontSize: 18 }}>
                    {gameStart ? '다음 문제' : '게임 시작'}
                  </Text>
                </Pressable>
              )}
              {gameName.startsWith('모') && (
                <Pressable
                  onPress={gameStart ? sendNextRequest : sendGameStartRequest}
                  style={({ pressed }) => [
                    styles.icon_each,
                    pressed && { backgroundColor: 'lightgrey' },
                  ]}
                >
                  {gameStart ? (
                    <Text style={{ color: 'black', fontSize: 15 }}>
                      게임 진행 중
                    </Text>
                  ) : (
                    <Text style={{ color: 'black', fontSize: 18 }}>
                      게임 시작
                    </Text>
                  )}
                </Pressable>
              )}
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
              게임 시작 버튼을 눌러 게임을 시작하세요!
            </Text>
          )}
        </View>
        <View style={styles.bottom}>
          {gameStart && !gameName.startsWith('모') && (
            <Pressable
              onPress={() => {
                sendConfirmRequest();
                sendAnswerRequest();
              }}
              style={({ pressed }) => [
                styles.icon_each,
                pressed && { backgroundColor: 'lightgrey' },
              ]}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>{answerText}</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.last}>
          {gameStart && !gameName.startsWith('모') && (
            <View style={styles.list}>
              <Text style={{ color: 'white', fontSize: 20, paddingBottom: 10 }}>
                선착순 LIST
              </Text>
              <View style={styles.listContainer}></View>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeInputView>
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
    flex: 1.5,
    flexDirection: 'row',
    //backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  topLeft: {
    flex: 1,
    //backgroundColor: 'red',
  },
  topMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  gameTitle: {
    //backgroundColor: 'yellow',
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topRight: {
    flex: 1,
    //backgroundColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  exit: {
    //backgroundColor: 'blue',
    paddingTop: 20,
    marginLeft: 20,
  },
  next: {
    backgroundColor: 'white',
    marginRight: 10,
    marginTop: 80,
    borderRadius: 10,
    height: 33,
    width: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 6,
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
    flex: 1,
    width: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  last: {
    flex: 2,
    width: '100%',
    paddingLeft: 30,
  },
  list: {},
  listContainer: {
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default GameManageScreen;
