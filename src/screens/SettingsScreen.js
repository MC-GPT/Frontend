import { View, TouchableOpacity, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import favicon from '../../assets/favicon.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const { nickname, account } = useUserContext();
  const navigation = useNavigation();

  const handleCodeRefresh = () => {
    navigation.navigate('Room');
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
          <Image
            style={styles.profileImg}
            source={{
              uri: 'https://maps.googleapis.com/maps/api/streetview?size=1080x560&location=29.977296,31.132495&heading=45&fov=120&pitch=30&key=AIzaSyBfIFxNGNnYqmSKRz3x-stcQoZiAyjq6T0',
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.listContainer}>
        <Text style={styles.listText}>계정 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={handleCodeRefresh}
      >
        <Text style={styles.listText}>코드 리프레쉬</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
  },
  profileImg: {
    height: 100,
    width: 100,
    opacity: 0.3,
    borderRadius: 10,
  },
});
