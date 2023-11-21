import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PopupB, { PopupTypesB } from '../components/PopupB';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useMainContext } from '../contexts/MainContext';
import { useUserContext } from '../contexts/UserContext';
import { FontAwesome } from '@expo/vector-icons';

const LightningScreen = ({ navigation }) => {
  const { home_id, apps, setApps, owner } = useMainContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleLight, setVisibleLight] = useState(false);
  const [input, setInput] = useState('');
  const { jwt } = useUserContext();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const insets = useSafeAreaInsets();

  const postApp = async (number, name) => {
    try {
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/create-app',
        {
          serialNumber: number,
          name: name,
          home_id: home_id,
          light: true,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      Alert.alert('조명 생성 완료');
      setVisibleLight(false);
      getApp();
    } catch (e) {
      Alert.alert('조명 생성 실패');
    }
  };

  const getApp = async () => {
    const url =
      'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/apps?home=' +
      home_id;
    try {
      const value = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setApps(value.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLight = async (appId) => {
    try {
      const response = await axios.delete(
        `http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/delete-app?app=` +
          appId,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('조명 삭제 완료');
        getApp();
      } else {
        Alert.alert('조명 삭제 실패');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('조명 삭제 실패');
    }
  };
  const handleDeleteLight = (appId, appName) => {
    Alert.alert('조명 삭제', `"${appName}"을 삭제하시겠습니까?`, [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => deleteLight(appId),
      },
    ]);
  };

  const [powerButtonStates, setPowerButtonStates] = useState(
    Array(jsonData.filter((v) => v.light).length).fill(false)
  );

  const togglePowerButton = (index) => {
    const newButtonStates = [...powerButtonStates];
    newButtonStates[index] = !newButtonStates[index];
    setPowerButtonStates(newButtonStates);
  };

  useEffect(() => {
    setJsonData(apps);
  }, [apps]);

  const onSubmit = () => {
    Alert.alert('입력완료');
  };

  const imageMapping = {
    111: require('../../assets/app/WashingMachine.png'),
    112: require('../../assets/app/AirPurifier.png'),
    113: require('../../assets/app/GameConsole.png'),
    114: require('../../assets/app/HomeTheater.png'),
    115: require('../../assets/app/Speaker.png'),
    116: require('../../assets/app/Standbyme.png'),
    117: require('../../assets/app/AirConditioner.png'),
    211: require('../../assets/app/Beer.png'),
    212: require('../../assets/app/Lamp.png'),
    213: require('../../assets/app/LightBulb.png'),
    214: require('../../assets/app/MoodupFridge.png'),
    215: require('../../assets/app/LightBulb.png'),
    216: require('../../assets/app/Hanger.png'),
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top - 45, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.top}>
          <Input
            value={input}
            onChangeText={(text) => setInput(text.trim())}
            title={'원하시는 조명을 입력하세요'}
            placeholder={''}
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.DONE}
            onSubmitEditing={onSubmit}
          />
        </View>

        <View style={styles.main}>
          <View style={styles.roomButton}>
            {jsonData
              .filter((v) => v.light)
              .map((v) => {
                return (
                  <Pressable
                    key={v.id}
                    onPress={() => navigation.navigate('Mood')}
                    onLongPress={() => handleDeleteLight(v.id, v.name)}
                    style={({ pressed }) => [
                      buttonStyles.container,
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View style={buttonStyles.wrapper}>
                        <Image
                          source={imageMapping[v.serialNumber]}
                          style={buttonStyles.image}
                        />
                        <Text>{v.name}</Text>
                      </View>
                      <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ marginLeft: 37, paddingBottom: 10 }}>
                          <Pressable
                            onPress={() => {
                              v.locked = !v.locked;
                            }}
                            style={({ pressed }) => [
                              {
                                opacity: pressed ? 0.5 : 1,
                              },
                            ]}
                          >
                            {owner && (
                              <FontAwesome
                                name={v.locked ? 'lock' : 'unlock'}
                                size={18}
                                color="black"
                              />
                            )}
                          </Pressable>
                        </View>

                        <Pressable
                          onPress={() => togglePowerButton(v.id)}
                          style={({ pressed }) => [
                            {
                              opacity: pressed
                                ? 1
                                : powerButtonStates[v.id]
                                ? 1
                                : 0.5,
                            },
                          ]}
                        >
                          <Image
                            source={require('../../assets/onoff.png')}
                            style={buttonStyles.power}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={{ color: 'lightgrey', paddingBottom: 10 }}>
            길게 눌러서 삭제
          </Text>
          {owner && (
            <Pressable onPress={() => setVisibleLight(true)}>
              <FontAwesome name="plus-circle" size={40} color="white" />
            </Pressable>
          )}
        </View>
        <PopupB
          visible={visibleLight}
          onClose={() => setVisibleLight(false)}
          onChangeTextNumber={(text) => setNumber(text.trim())}
          onChangeTextName={(text) => setName(text.trim())}
          onSubmit={() => postApp(number, name)}
          popupType={PopupTypesB.LIGHT}
        ></PopupB>
      </ImageBackground>
    </SafeInputView>
  );
};

LightningScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 152,
    height: 120,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#D7DE92',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
  },
  image: {
    //backgroundColor: 'yellow',
    width: 65,
    height: 65,
    marginBottom: 2,
  },
  wrapper: {
    width: 80,
    //backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  power: {
    //backgroundColor: 'black',
    width: 42,
    height: 42,
    marginLeft: 7,
    marginBottom: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  top: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    //backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 10,
    width: '100%',
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomButton: {
    width: '100%',
    //backgroundColor: 'aqua',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 54,
  },
  lightContainer: {
    //backgroundColor: 'black',
  },
  bottom: {
    flex: 2,
    width: '100%',
    //backgroundColor: 'brown',
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

export default LightningScreen;
