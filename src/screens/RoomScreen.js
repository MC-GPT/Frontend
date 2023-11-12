import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { useMainContext } from '../contexts/MainContext';
import PropTypes from 'prop-types';
import Popup, { PopupTypes } from '../components/Popup';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const RoomScreen = ({ navigation }) => {
  const { setUser } = useUserContext();
  const { jwt } = useUserContext();
  const [jsonData, setJsonData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const insets = useSafeAreaInsets();

  // 마이홈 정보 get
  const getRoom = async () => {
    try {
      const value = await axios.get(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/owner-homes',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setJsonData(value.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 게스트룸 정보 get
  const getGuest = async () => {
    try {
      const value = await axios.get(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/guest-homes',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setGuestData(value.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 방 생성 post
  const postRoom = async (roomName) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/create-home',
        {
          name: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      Alert.alert('방 생성 완료');
      setVisibleTop(false);
      getRoom();
    } catch (e) {
      Alert.alert('방 생성 실패');
    }
  };

  // 방 코드로 추가
  const postCode = async (roomCode) => {
    try {
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/enter-home',
        {
          home_code: roomCode,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      Alert.alert('방 추가 완료');
      setVisibleBottom(false);
      getGuest();
    } catch (e) {
      Alert.alert('방 추가 실패');
    }
  };

  // 방 입장시 받아올, 방-가전-게임 등 메인 정보
  const { setHomeId, setHomeName, setHomeCode, setApps, setGames, setOwner } =
    useMainContext();
  const getMain = async (roomId) => {
    try {
      const url =
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/main?home=' +
        roomId;
      const data = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setHomeId(data.data.home_id);
      setHomeName(data.data.home_name);
      setHomeCode(data.data.home_code);
      setApps(data.data.apps);
      setGames(data.data.games);
      setOwner(data.data.owner);
      navigation.navigate('ContentTab');
    } catch (e) {
      console.error(e);
    }
  };
  // 방 삭제 함수
  const deleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(
        `http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/delete-home?home=` +
          roomId,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert('방 삭제 완료');
        getRoom();
        getGuest();
      } else {
        Alert.alert('실패');
      }
    } catch (error) {
      Alert.alert('방 삭제 실패');
    }
  };

  const handleLongPress = (roomId, roomName) => {
    Alert.alert('방 삭제', `"${roomName}"을 삭제하시겠습니까?`, [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => deleteRoom(roomId),
      },
    ]);
  };

  useEffect(() => {
    getRoom();
    getGuest();
  }, []);

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
          <Image
            style={styles.title}
            source={require('../../assets/mcnugulogo.png')}
          />

          <View style={styles.logoutButton}>
            <Pressable
              onPress={() => setUser(null)}
              buttonType={ButtonTypes.DANGER}
            >
              <View style={styles.logoutRow}>
                <Text style={{ color: 'white', fontSize: 15 }}> 로그아웃 </Text>
                <MaterialIcons name="logout" size={24} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.myHomeBox}>
            <Text style={styles.myHome}>마이홈</Text>
          </View>
          <View style={styles.roomButton}>
            {jsonData.length > 0 ? (
              jsonData.map((v) => {
                if (v && v.name) {
                  return (
                    <Button
                      key={v.id}
                      title={v.name}
                      onPress={() => getMain(v.id)}
                      onLongPress={() => handleLongPress(v.id, v.name)}
                      buttonType={ButtonTypes.ROOM}
                      styles={buttonStyles}
                    />
                  );
                }
                return null;
              })
            ) : (
              <Text
                style={{
                  color: 'white',
                  paddingTop: 30,
                  fontSize: 18,
                  marginLeft: 5,
                }}
              >
                + 버튼을 눌러 방을 생성해주세요
              </Text>
            )}
          </View>
        </View>
        <View style={styles.createButton}>
          <Pressable
            onPress={() => setVisibleTop(true)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.9 : 1 }],
              },
            ]}
          >
            <FontAwesome name="plus-circle" size={40} color="white" />
          </Pressable>
        </View>
        <View style={styles.mainGuest}>
          <View style={styles.myHomeBox}>
            <Text style={styles.myHome}>게스트</Text>
          </View>
          <View style={styles.roomButton}>
            {guestData.length > 0 ? (
              guestData.map((v) => {
                if (v && v.name) {
                  return (
                    <Button
                      key={v.id}
                      title={v.name}
                      onPress={() => getMain(v.id)}
                      onLongPress={() => handleLongPress(v.id, v.name)}
                      buttonType={ButtonTypes.GUEST}
                      styles={buttonStyles}
                    />
                  );
                }
                return null;
              })
            ) : (
              <Text
                style={{
                  color: 'white',
                  paddingTop: 30,
                  fontSize: 18,
                  marginLeft: 5,
                }}
              >
                + 버튼을 눌러 코드를 입력해주세요
              </Text>
            )}
          </View>
        </View>
        <View style={styles.enterButton}>
          <Pressable
            onPress={() => setVisibleBottom(true)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.9 : 1 }],
              },
            ]}
          >
            <FontAwesome name="plus-circle" size={40} color="white" />
          </Pressable>
        </View>
        <Popup
          visible={visibleTop}
          onClose={() => setVisibleTop(false)}
          onChangeText={(text) => setRoomName(text.trim())}
          onSubmit={() => postRoom(roomName)}
          popupType={PopupTypes.ROOMCREATE}
        ></Popup>
        <Popup
          visible={visibleBottom}
          onClose={() => setVisibleBottom(false)}
          onChangeText={(text) => setRoomCode(text.trim())}
          onSubmit={() => postCode(roomCode)}
          popupType={PopupTypes.ROOMENTER}
        ></Popup>
      </ImageBackground>
    </SafeInputView>
  );
};

RoomScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 135,
    //backgroundColor: 'pink',
    marginHorizontal: 10,
    paddingTop: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  button: {
    width: '100%',
    height: 60,
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    //backgroundColor: 'pink',
    marginLeft: 10,
  },
  logoutButton: {
    marginLeft: 140,
  },
  logoutRow: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 4,
    width: '100%',
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    //backgroundColor: 'white',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainGuest: {
    width: '100%',
    // backgroundColor: 'skyblue',
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myHomeBox: {
    width: '100%',
    //  backgroundColor: 'aqua',
    justifyContent: 'flex-start',
  },
  myHome: {
    marginLeft: 40,
    fontSize: 24,
    color: 'white',
  },
  roomButton: {
    //backgroundColor: 'aqua',
    flex: 1,
    width: '82%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 35,
  },
  enterButton: {
    //backgroundColor: 'brown',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoomScreen;
