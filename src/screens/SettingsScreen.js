import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import { StyleSheet, Alert } from 'react-native';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMainContext } from '../contexts/MainContext';
import * as Svg from 'react-native-svg';

const SettingScreen = () => {
  const { nickname, account, jwt } = useUserContext();
  const navigation = useNavigation();
  const { home_id, setHomeCode, owner } = useMainContext();
  const insets = useSafeAreaInsets();

  const handleCodeRefresh = async () => {
    try {
      const data = await axios.post(
        `http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/refresh-home?home=${home_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setHomeCode(data.data.home_code);
      Alert.alert('코드 리프레쉬 완료');
      navigation.navigate('Room');
    } catch (e) {
      Alert.alert('코드 리프레쉬 실패');
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
        <View style={styles.wrapper}>
          <View style={styles.myInfo}>
            <View>
              <Text style={styles.myInfoText}>내 정보</Text>
              <Text style={styles.myInfoContent}>닉네임: {nickname}</Text>
              <Text style={styles.myInfoContent}>ID: {account} </Text>
            </View>
            <View style={styles.profile}>
              <Image
                style={styles.profileImg}
                source={require('../../assets/profile.png')}
              />

              <Text style={{ color: 'white', paddingTop: 5 }}>프로필 편집</Text>
            </View>
          </View>
          <View style={styles.listWrapper}>
            <TouchableOpacity style={styles.listContainer}>
              <Text style={styles.listText}>계정 설정</Text>
            </TouchableOpacity>
            {owner && (
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => handleCodeRefresh()}
              >
                <Text style={styles.listText}>코드 리프레쉬</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    paddingTop: 10,
  },
  myInfo: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    //backgroundColor: 'white',
    // borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 10,
  },
  myInfoText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  myInfoContent: {
    fontSize: 17,
    marginBottom: 10,
    color: 'white',
  },
  profile: {
    marginTop: 15,
    height: 150,
    width: 100,
    //backgroundColor: '#ebebeb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    opacity: 0.5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  listWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    //backgroundColor: 'yellow',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    width: '90%',
    height: 70,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 10,
  },
  listText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SettingScreen;
