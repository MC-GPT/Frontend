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
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
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
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=48.858114,2.293191&heading=10&fov=90&pitch=38&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '자유의 여신상',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.689249,-74.044502&heading=220&fov=130&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '콜로세움',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=41.89121,12.492231&heading=180&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '만리장성',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=40.431908,116.570374&heading=300&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '베네치아',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=45.440848,12.315515&heading=270&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '피사의 사탑',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=43.722952,10.396597&heading=10&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '시드니 오페라 하우스',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=-33.856159,151.214234&heading=15&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '피라미드',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=29.977296,31.132495&heading=1&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '타지마할',
      image:
        'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=27.175142,78.042448&heading=100&fov=100&pitch=10&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
    },
    {
      answer: '도쿄 스카이트리',
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

  if (gameName.startsWith('랜')) {
    if (imageIndex < geo.length) {
      nextImageData = geo[imageIndex];
      answerData = geo[imageIndex - 1];
    }
  } else if (gameName.startsWith('디')) {
    if (imageIndex < disney.length) {
      nextImageData = disney[imageIndex];
      answerData = disney[imageIndex - 1];
    }
  } else if (gameName.startsWith('모')) {
    if (imageIndex < gather.length) {
      nextImageData = gather[imageIndex];
    }
  } else {
    nextImageData = gather[imageIndex];
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
      const enterMessage = {
        messageType: 'ENTER',
        roomId: gamePlayId,
        sender: gameName,
        message: '',
      };
      ws.current.send(JSON.stringify(enterMessage));
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setImageSource(message[0]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onerror = (e) => {
      console.log(e.message);
    };

    ws.current.onclose = () => {};

    return () => {
      ws.current.close();
    };
  }, []);

  const sendGameStartRequest = () => {
    setGameStart(true); // 게임 시작 상태를 true로 설정
    setImageIndex((prevIndex) => prevIndex + 1);
    setImageSource(nextImageData.image);

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

    ws.current.send(JSON.stringify(nextMessage, answerMessage));
  };

  const sendNextRequest = () => {
    {
      setPressed(false);
      setShowAnswer(false);
      setImageIndex((prevIndex) => prevIndex + 1);
      setImageSource(nextImageData.image);

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
  };

  //선착순 리스트용 상태변수
  const [name, setName] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const AnswerOrder = async () => {
    try {
      const data = await axios.post(
        `http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/get-serial?roomId=` +
          gamePlayId,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setShowAnswer(true);
      setName(data.data);
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
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  textShadowColor: '#D7DE92',
                  textShadowRadius: 1,
                }}
              >
                {gameName}
              </Text>
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
              {gameName.startsWith('디') && (
                <Text
                  style={{
                    fontSize: 17,
                    marginLeft: 100,
                    color: '#65676D',

                    fontStyle: 'italic',
                  }}
                >
                  Image generated by GPT 4.0
                </Text>
              )}
              {gameName.startsWith('랜') && (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    color: '#65676D',
                    paddingTop: 10,
                  }}
                >
                  Google Street View generated by GPT 4.0
                </Text>
              )}
              {gameName.startsWith('모') && (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    color: '#65676D',
                    paddingTop: 10,
                  }}
                >
                  Powered by NUGU AI speaker
                </Text>
              )}
            </View>
          ) : (
            <Text
              style={{ color: 'lightgrey', fontSize: 20, textAlign: 'center' }}
            >
              게임 시작 버튼을 누르세요
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
                선착순 리스트
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.listContainer}>
                  {showAnswer ? (
                    <Text style={{ color: 'white', fontSize: 18 }}>{name}</Text>
                  ) : (
                    <Text style={{ color: 'lightgrey', fontSize: 15 }}>
                      ? 버튼을 눌러 1등을 확인해보세요
                    </Text>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={AnswerOrder}
                    style={({ pressed }) => [
                      {
                        color: 'lightgrey',
                        opacity: pressed ? 0.6 : 1,
                      },
                    ]}
                  >
                    {showAnswer ? (
                      <AntDesign name="right" size={30} color="white" />
                    ) : (
                      <AntDesign name="question" size={30} color="white" />
                    )}
                  </Pressable>
                </View>
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
    height: 370,
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
    width: '67%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 10,
    flexDirection: 'row',
    marginRight: 10,
  },
  buttonContainer: {
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22.5%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default GameManageScreen;
