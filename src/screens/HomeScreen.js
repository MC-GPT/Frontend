import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  // PropTypes,
} from 'react-native';
import { WHITE } from '../colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import { ButtonTypes } from '../components/Button';
import { useRef, useEffect } from 'react';
import { useMainContext } from '../contexts/MainContext';
import TextAnimation from '../components/TextAnimation';

// eslint-disable-next-line react/prop-types
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { homename, homecode } = useMainContext();

  // const notice = useRef(new Animated.Value(NOTICEMARGIN)).current;

  // const noticeAnimation = () => {

  //   Animated.timing(NOTICEMARGIN, )
  // }

  // useEffect(() => {
  //   noticeAnimation();
  // });

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom - 100 },
        ]}
      >
        <View style={styles.top}>
          <Text style={styles.homename}>홈네임 {homename}</Text>
          <View style={styles.topright}>
            <View style={styles.logoutButton}>
              <Pressable
                // eslint-disable-next-line react/prop-types
                onPress={() => navigation.navigate('Room')}
                buttonType={ButtonTypes.DANGER}
              >
                <Text>방 선택화면으로 돌아가기</Text>
                {/* <MaterialIcons name="logout" size={24} color="black" /> */}
              </Pressable>
            </View>
            <Text style={styles.codestyle}> 코드번호 {homecode} </Text>
          </View>
        </View>
        <View style={styles.notice}>
          <TextAnimation />
        </View>
        <View style={styles.musicbox}>
          <View style={styles.image}>
            <Image
              source={require('../../assets/NewJeans.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>Super Shy</Text>
          <Text style={styles.artist}>NewJeans</Text>
          <View style={styles.music_icon}>
            <View style={styles.icon_each}>
              <MaterialIcons name="shuffle" size={30} color="black" />
            </View>
            <View style={styles.icon_each}>
              <MaterialIcons name="skip-previous" size={30} color="black" />
            </View>
            <View style={styles.icon_each}>
              <MaterialIcons name="play-arrow" size={30} color="black" />
            </View>
            <View style={styles.icon_each}>
              <MaterialIcons name="skip-next" size={30} color="black" />
            </View>
            <View style={styles.icon_each}>
              <MaterialIcons name="replay" size={30} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.musiclist}>Music list1</Text>
          <Text style={styles.musiclist}>Music list2</Text>
          <Text style={styles.musiclist}>Music list3</Text>
          <Text style={styles.musiclist}>Music list4</Text>
          <Text style={styles.musiclist}>Music list5</Text>
        </View>
      </View>
    </SafeInputView>
  );
};

HomeScreen.propTypes = {
  // navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  top: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homename: {
    fontSize: 22,
    marginLeft: 20,
  },
  topright: {
    flexDirection: '',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  codestyle: {
    paddingTop: 20,
    fontSize: 18,
  },
  logoutButton: {
    // backgroundColor: 'white',
  },
  notice: {
    flex: 1,
    fontSize: 20,
    marginTop: 10,
  },
  musicbox: {
    flex: 7,
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: '#9e42f5',
  },
  title: {
    fontSize: 28,
    padding: 10,
    height: 50,
  },
  artist: {
    fontSize: 18,
    height: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  music_icon: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'space-between',
    height: 70,
  },
  icon_each: {
    margin: 8,
  },
  bottom: {
    flex: 3,
    // backgroundColor: 'blue',
  },
  musiclist: { fontSize: 20 },
});

export default HomeScreen;
