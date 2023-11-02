import { View, TouchableOpacity, Image, Text } from 'react-native';
import { StyleSheet, Alert } from 'react-native';
import favicon from '../../assets/favicon.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMainContext } from '../contexts/MainContext';

const SettingScreen = () => {
  const { nickname, account, jwt } = useUserContext();
  const navigation = useNavigation();
  const { home_id, setHomeCode } = useMainContext();

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
      navigation.navigate('Room');
    } catch (e) {
      Alert.alert('코드 리프레쉬 실패');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.myInfo}>
        <View>
          <Text style={styles.myInfoText}>내 정보</Text>
          <Text style={styles.myInfoContent}>닉네임: {nickname}</Text>
          <Text style={styles.myInfoContent}>ID: {account} </Text>
        </View>
        <View style={styles.profile}>
          <Image style={styles.profileImg} source={favicon} />
          <Text>프로필 편집</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.listContainer}>
        <Text style={styles.listText}>계정 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => handleCodeRefresh()}
      >
        <Text style={styles.listText}>코드 리프레쉬</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  listText: {
    color: '#555555',
  },
  myInfo: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  myInfoText: {
    fontSize: 20,
    marginBottom: 10,
  },
  myInfoContent: {
    fontSize: 17,
    marginBottom: 10,
  },
  profile: {
    height: 100,
    width: 100,
    backgroundColor: '#ebebeb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    opacity: 0.3,
    borderRadius: 10,
  },
});

export default SettingScreen;
