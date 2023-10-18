import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import PropTypes from 'prop-types';
import Popup, { PopupTypes } from '../components/Popup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
// import { useRoomContext } from '../contexts/RoomContext';

const RoomScreen = ({ navigation }) => {
  const { setUser } = useUserContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [roomName, setRoomName] = useState('');
  // const [roomCode, setRoomCode] = useState('');

  // jwt token
  const { jwt } = useUserContext();
  

  // 방 정보 get
  const getRoom = async () => {
    try {
      console.log(jwt);
      const value = await axios.get(
        'http://127.0.0.1:8080/homes',
        {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        }
      );
      console.log(value.data);
      setJsonData(value.data);
    } catch (error) {
      console.error(error);
    }
  };

  //방 생성 post
  const postRoom = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post('https://reqres.in/api/users', {
        roomName,
      });
      Alert.alert('방 생성 완료');
      setVisibleTop(false);
      getRoom();
    } catch (e) {
      Alert.alert('방 생성 실패');
    }
  };

  //방 코드 확인 후 이동 (로그인이랑 같은 방법)
  // const postCode = async () => {
  //   try {
  //     const data = await axios.post('url', {
  //       roomCode,
  //     });
  //     setVisibleBottom(false);
  //     setRoomCode(data.code);
  //   } catch (e) {
  //     Alert.alert('잘못된 코드입니다');
  //   }
  // };

  useEffect(() => {
    getRoom();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>방을 선택하세요</Text>
        <View style={styles.logoutButton}>
          <Pressable
            onPress={() => setUser(null)}
            buttonType={ButtonTypes.DANGER}
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.roomButton}>
          {jsonData.map((v) => {
            return (
              <Button
                key={v.id}
                title={v.title}
                onPress={() => navigation.navigate('ContentTab')}
                buttonType={ButtonTypes.ROOM}
                styles={buttonStyles}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.createButton}>
          <Button
            title={'방 생성'}
            onPress={() => setVisibleTop(true)}
          ></Button>
        </View>
        <View style={styles.createButton}>
          <Button
            title={'코드 입력'}
            onPress={() => setVisibleBottom(true)}
          ></Button>
        </View>
      </View>
      <Popup
        visible={visibleTop}
        onClose={() => setVisibleTop(false)}
        onChangeText={(text) => setRoomName(text.trim())}
        onSubmit={() => postRoom()}
        popupType={PopupTypes.ROOMCREATE}
      ></Popup>
      <Popup
        visible={visibleBottom}
        onClose={() => setVisibleBottom(false)}
        // onChangeText={(text) => setRoomCode(text.trim())}
        //onSubmit={() => postCode()}
        onSubmit={() =>
          navigation.navigate('ContentTab') & setVisibleBottom(false)
        }
        popupType={PopupTypes.ROOMENTER}
      ></Popup>
    </SafeAreaView>
  );
};

RoomScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 140,
    // backgroundColor: 'black',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 140,
    borderRadius: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  top: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginLeft: 105,
  },
  logoutButton: {
    marginLeft: 60,
  },
  main: {
    flex: 5,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomButton: {
    // backgroundColor: 'aqua',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 35,
  },
  bottom: {
    flex: 2,
    width: '100%',
    // backgroundColor: 'brown',
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

export default RoomScreen;
