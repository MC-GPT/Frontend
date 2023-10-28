import { Alert, StyleSheet, View, Pressable } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PopupB, { PopupTypesB } from '../components/PopupB';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
import { useMainContext } from '../contexts/MainContext';
import { MaterialIcons } from '@expo/vector-icons';

const ElectronicScreen = ({ navigation }) => {
  const { home_id, apps, setApps } = useMainContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleLight, setVisibleLight] = useState(false);
  const { jwt } = useUserContext();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const postApp = async (number, name) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/create-app',
        {
          serialNumber: number,
          name: name,
          home_id: home_id,
          light: false,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      Alert.alert('가전 생성 완료');
      setVisibleLight(false);
      getApp();
    } catch (e) {
      Alert.alert('가전 생성 실패');
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

  const deleteApp = async (appId) => {
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
        Alert.alert('가전 삭제 완료');
        getApp();
      } else {
        Alert.alert('가전 삭제 실패');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('가전 삭제 실패');
    }
  };

  const handleDeleteApp = (appId, appName) => {
    Alert.alert('가전 삭제', `"${appName}"을 삭제하시겠습니까?`, [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => deleteApp(appId),
      },
    ]);
  };

  useEffect(() => {
    setJsonData(apps);
  }, [apps]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.main}>
        <View style={styles.roomButton}>
          {jsonData
            .filter((v) => !v.light)
            .map((v) => {
              return (
                <View key={v.id} style={styles.AppContainer}>
                  <Button
                    title={v.name}
                    onPress={() => navigation.navigate('Mood')}
                    buttonType={ButtonTypes.ROOM}
                    styles={buttonStyles}
                  />
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDeleteApp(v.id, v.name)}
                  >
                    <MaterialIcons name="delete" size={24} color="red" />
                  </Pressable>
                </View>
              );
            })}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.createButton}>
          <Button
            title={'가전 추가'}
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
        popupType={PopupTypesB.ELECTRO}
      ></PopupB>
    </SafeAreaView>
  );
};

ElectronicScreen.propTypes = {
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
    marginHorizontal: 54,
  },
  AppContainer: {},
  deleteButton: {},
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

export default ElectronicScreen;
