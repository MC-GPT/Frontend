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

const GameManageScreen = () => {
  const { gameName } = useGameContext();
  const [imageSource, setImageSource] = useState('');

  const [gameStart, setGameStart] = useState(false);
  const { gamePlayId } = useGameContext();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  let ws = useRef(null);

  let geo = [
    {
      area: '에펠탑',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=48.858844,2.294351&heading=140&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      area: '자유의 여신상',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.689247,-74.044502&heading=10&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      area: '콜로세움',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=41.89021,12.492231&heading=20&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      area: '만리장성',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.431908,116.570374&heading=300&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      area: '피라미드',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=29.977296,31.132495&heading=30&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      area: '타지마할',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=27.175142,78.042442&heading=10&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
  ];
  const [imageIndex, setImageIndex] = useState(0);
  let nextImageData = geo[imageIndex];

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

  //const handleWebSocketMessage = (message) => {
  //   switch (message.type) {
  //     case 'ENTER': {
  //       // 서버로부터 초기 게임 데이터 수신 및 화면에 렌더링
  //       //  const initialImageData = message.data.image; // 서버에서 이미지 데이터를 받아옴
  //       //  setImageSource(initialImageData);

  //       break;
  //     }
  //     case 'NEXT': {
  //       // '다음 문제' 버튼을 눌렀을 때 처리
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

  const sendGameStartRequest = () => {
    handleShuffle();
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
      handleShuffle();
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
      const answerMessage = {
        messageType: 'ANSWER',
        roomId: gamePlayId,
        sender: 'host',
        message: '',
        imageUrls: [nextImageData.area],
      };
      try {
        ws.current.send(JSON.stringify(nextMessage, answerMessage));
      } catch (e) {
        console.log(e.message);
      }
      console.log(imageIndex);
      console.log('next message 전송완료');
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

  const [pressed, setPressed] = useState(false);
  const sendConfirmRequest = () => {
    setPressed(true);
  };
  const answerText = pressed ? geo[imageIndex - 1].area : '정답 확인';

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const initialTexts = ['호랭이', '다람쥐', '너구리'];
  const [shuffledTexts, setShuffledTexts] = useState(
    shuffleArray(initialTexts)
  );
  const [visibleTexts, setVisibleTexts] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (shuffledTexts.length > visibleTexts.length) {
        setVisibleTexts((prevVisibleTexts) => [
          ...prevVisibleTexts,
          shuffledTexts[prevVisibleTexts.length],
        ]);
      } else {
        clearInterval(timer);
      }
    }, Math.random() * 500 + 200);
    return () => clearInterval(timer);
  }, [shuffledTexts, visibleTexts]);

  const handleShuffle = () => {
    setShuffledTexts(shuffleArray(initialTexts));
    setVisibleTexts([]);
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
                <Text style={{ color: 'white', fontSize: 23 }}> 종료 </Text>
              </Pressable>
            </View>
            <View style={styles.next}>
              <Pressable
                onPress={gameStart ? sendNextRequest : sendGameStartRequest}
                style={({ pressed }) => [
                  styles.icon_each,
                  pressed && { backgroundColor: 'lightgrey' },
                ]}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {gameStart ? '다음 문제' : '게임 시작'}
                </Text>
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
              게임 시작 버튼을 눌러 게임을 시작하세요!
            </Text>
          )}
        </View>

        <View style={styles.bottom}>
          <View style={styles.confirm}>
            {gameStart && (
              <Pressable
                onPress={sendConfirmRequest}
                style={({ pressed }) => [
                  styles.icon_each,
                  pressed && { backgroundColor: 'lightgrey' },
                ]}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {answerText}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.last}>
          {gameStart && (
            <View style={styles.list}>
              <Text style={{ color: 'white', fontSize: 20, paddingBottom: 10 }}>
                선착순 LIST
              </Text>
              <View style={styles.listContainer}>
                {visibleTexts.map((text, index) => (
                  <Text
                    key={index}
                    style={{
                      color: 'white',
                      fontSize: 18,
                      marginLeft: index > 0 ? 30 : 0,
                    }}
                  >
                    {text}
                  </Text>
                ))}
              </View>
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
    // backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10,
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
  next: {
    //backgroundColor: 'skyblue',
    marginRight: 10,
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
