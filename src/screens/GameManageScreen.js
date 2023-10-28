import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGameContext } from '../contexts/GameContext';
import { useEffect, useRef, useState } from 'react';

const GameManageScreen = () => {
  const { gameName } = useGameContext();
  const [imageSource, setImageSource] = useState(null);
  const [sendMsg, setSendMsg] = useState(false);

  const ws = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ws.current = new WebSocket(
      'ws://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/ws/game'
    );

    ws.current.onopen = () => {
      const enterMessage = {
        messageType: 'ENTER',
        roomId: 952,
        sender: 'host',
        message: '',
        imageUrls: ['https://www.naver.com/', 'https://www.naver.com/'],
      };
      ws.current.send(JSON.stringify(enterMessage));
      setSendMsg(true);
      console.log('enter');
    };
    ws.current.onerror = (e) => {
      console.log(e.message);
    };

    ws.current.onclose = () => {
      console.log('close');
    };

    return () => {
      console.log('clean up');
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (sendMsg) {
      ws.current.onmessage = (event) => {
        console.log(event.data);
        const message = JSON.parse(event.data);
        handleWebSocketMessage(message);
      };
    }
  }, [sendMsg]);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'ENTER': {
        // 서버로부터 초기 게임 데이터 수신 및 화면에 렌더링
        const initialImageData = message.data.image; // 서버에서 이미지 데이터를 받아옴
        setImageSource(initialImageData);
        break;
      }
      case 'NEXT': {
        // '다음 문제' 버튼을 눌렀을 때 처리
        const nextImageData = message.data.image; // 다음 이미지 데이터를 받아옴
        setImageSource(nextImageData);
        break;
      }
      case 'END':
        // '종료' 버튼을 눌렀을 때 게임 종료 처리
        break;
      default:
        // 다른 메시지 유형에 대한 처리
        break;
    }
  };

  const sendNextRequest = () => {
    {
      const nextMessage = {
        messageType: 'NEXT',
        roomId: 952,
        sender: 'host',
        message: '',
        imageUrls: ['https://www.naver.com/', 'https://www.naver.com/'],
      };
      ws.current.send(JSON.stringify(nextMessage));
      setSendMsg(true);
    }
  };

  const sendExitRequest = () => {
    const exitMessage = {
      messageType: 'EXIT',
      roomId: 952,
      sender: 'host',
      message: '',
      imageUrls: ['https://www.naver.com/', 'https://www.naver.com/'],
    };
    ws.current.send(JSON.stringify(exitMessage));
    setSendMsg(true);
  };

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
            <Pressable
              onPress={sendExitRequest}
              style={({ pressed }) => [
                styles.icon_each,
                pressed && { backgroundColor: 'lightgrey' },
              ]}
            >
              <Text style={{ fontSize: 23 }}> 종료 </Text>
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
              <Text style={{ fontSize: 20 }}> 다음 문제 </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.image}>
          <Image source={{ url: imageSource }} style={styles.image} />
        </View>
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
