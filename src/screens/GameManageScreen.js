import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGameContext } from '../contexts/GameContext';
import { useEffect, useState } from 'react';
import { WebSocket } from 'react-native-websocket';

const GameManageScreen = () => {
  const { gamePlayId, gameName } = useGameContext();
  const [socket, setSocket] = useState(null);
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    const url = 'basic url' + gamePlayId; // 뭔가 이렇게 하지 않을까 싶어서
    const ws = new WebSocket(url); //웹소켓 데이터 저장

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'INITIAL_DATA': {
        // 서버로부터 초기 게임 데이터 수신 및 화면에 렌더링
        const initialImageData = message.data.image; // 서버에서 이미지 데이터를 받아옴
        setImageSource(initialImageData);
        break;
      }
      case 'NEXT_DATA': {
        // '다음 문제' 버튼을 눌렀을 때 처리
        const nextImageData = message.data.image; // 다음 이미지 데이터를 받아옴
        setImageSource(nextImageData);
        break;
      }
      case 'GAME_END':
        // '종료' 버튼을 눌렀을 때 게임 종료 처리
        handleGameEnd();
        break;
      default:
        // 다른 메시지 유형에 대한 처리
        break;
    }
  };

  const handleGameEnd = () => {
    // '종료' 버튼을 눌렀을 때 게임 종료 처리
  };

  const sendWebSocketMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };
  const sendNextRequest = () => {
    sendWebSocketMessage({ type: 'NEXT' });
  };

  const sendExitRequest = () => {
    sendWebSocketMessage({ type: 'EXIT' });
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
            <Pressable onPress={sendExitRequest}>
              <Text style={{ fontSize: 23 }}> 종료 </Text>
            </Pressable>
          </View>
          <View style={styles.next}>
            <Pressable onPress={sendNextRequest}>
              <Text style={{ fontSize: 20 }}> 다음 문제 </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.image}>
          <Image source={{ uri: imageSource }} style={styles.image} />
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
