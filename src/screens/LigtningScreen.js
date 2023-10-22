import { Alert, StyleSheet, View } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PopupB, { PopupTypesB } from '../components/PopupB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useMainContext } from '../contexts/MainContext';
import { useUserContext } from '../contexts/UserContext';

const LightningScreen = ({ navigation }) => {
  const { home_id, apps, setApps } = useMainContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleLight, setVisibleLight] = useState(false);
  const [input, setInput] = useState('');
  const { jwt } = useUserContext();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  // 1. 무조건 false로 들어가는 이유 2. 새로고침 안됨
  const postApp = async (number, name) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        'http://127.0.0.1:8080/create-app',
        {
          serialNumber: number,
          name: name,
          home_id: home_id,
          isLight: true
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
      setJsonData(apps);
    } catch (e) {
      Alert.alert('조명 생성 실패');
    }
  };

  const getApp = async () => {
    const url = 'http://127.0.0.1:8080/apps?home=' + home_id;
    try {
      const value = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setApps(value.data);
      setJsonData(apps);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setJsonData(apps);
  }, []);

  const onSubmit = () => {
    Alert.alert('입력완료');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Input
          value={input}
          onChangeText={(text) => setInput(text.trim())}
          title={'원하는 조명을 입력하세요'}
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
                <Button
                  key={v.id}
                  title={v.name}
                  onPress={() => navigation.navigate('Mood')}
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
            title={'조명 추가'}
            onPress={() => setVisibleLight(true)}
          ></Button>
        </View>
      </View>
      <PopupB
        visible={visibleLight}
        onClose={() => setVisibleLight(false)}
        onChangeTextNumber={(text) => setNumber(text.trim())}
        onChangeTextName={(text) => setName(text.trim())}
        onSubmit={() => postApp(number, name)}
        popupType={PopupTypesB.LIGHT}
      ></PopupB>
    </SafeAreaView>
  );
};

LightningScreen.propTypes = {
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

export default LightningScreen;
