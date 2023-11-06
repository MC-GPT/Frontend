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

const GameManageScreen = () => {
  const { gameName } = useGameContext();
  const [imageSource, setImageSource] = useState('');

  const { gamePlayId } = useGameContext();
  const insets = useSafeAreaInsets();

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
  let nextImageData = geo[imageIndex].image;

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
        sender: 'host',
        message: '',
      };
      ws.current.send(JSON.stringify(enterMessage));
      console.log(JSON.stringify(enterMessage));
      console.log('enter 메시지 전송 완료');
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('host message : ', message);
        setImageSource(message[0]);
        // handleWebSocketMessage(message);
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

  const sendNextRequest = () => {
    {
      setImageIndex((prevIndex) => prevIndex + 1);
      setImageSource(nextImageData);
      console.log('nextImageData의 내용은 아래와 같다');
      console.log(nextImageData);
      const nextMessage = {
        messageType: 'NEXT',
        roomId: gamePlayId,
        sender: 'host',
        message: '',
        imageUrls: [nextImageData],
      };
      ws.current.send(JSON.stringify(nextMessage));
      console.log('next 메시지 전송 완료');
    }
  };

  const sendExitRequest = () => {
    const exitMessage = {
      messageType: 'EXIT',
      roomId: gamePlayId,
      sender: 'host',
      message: '',
    };
    ws.current.send(JSON.stringify(exitMessage));
    console.log('Exit 메시지 전송 완료');
  };

  const sendConfirmRequest = () => {
    const confirmMessage = {
      messageType: 'CONFIRM',
      roomId: 53,
      sender: 'host',
      message: '',
      imageUrls: ['https://www.naver.com/', 'https://www.naver.com/'],
    };
    ws.current.send(JSON.stringify(confirmMessage));
    console.log('Confirm 메시지 전송 완료');
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top - 60, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <View style={styles.gameTitle}>
              <Text style={{ fontSize: 25, color: 'white' }}>
                게임이름{gameName}
              </Text>
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
                onPress={sendNextRequest}
                style={({ pressed }) => [
                  styles.icon_each,
                  pressed && { backgroundColor: 'lightgrey' },
                ]}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>다음 문제</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <Image
            style={styles.image}
            source={{
              uri: imageSource,
            }}
          ></Image>
        </View>
        <View style={styles.bottom}>
          <View style={styles.confirm}>
            <Pressable
              onPress={sendConfirmRequest}
              style={({ pressed }) => [
                styles.icon_each,
                pressed && { backgroundColor: 'lightgrey' },
              ]}
            >
              <Text style={{ color: 'white', fontSize: 20 }}> 정답 확인 </Text>
            </Pressable>
          </View>
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
    flex: 1,
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
    flex: 5,
    // backgroundColor: 'pink',
    width: '100%',
  },
  image: {
    flex: 1,
  },
  bottom: {
    flex: 3,
    width: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default GameManageScreen;
