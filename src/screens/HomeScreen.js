import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from 'react-native';
import { WHITE } from '../colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import { ButtonTypes } from '../components/Button';
import { useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import TextAnimation from '../components/TextAnimation';
//import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';

// eslint-disable-next-line react/prop-types
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { home_name, home_code, owner } = useMainContext();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom - 26 },
        ]}
      >
        <View style={styles.top}>
          <View style={styles.topleft}>
            <View style={styles.topIcon}>
              {owner ? (
                <Octicons name="home" size={24} color="#AF6BE4" />
              ) : (
                <Zocial name="guest" size={24} color="#09B4FF" />
              )}

              {owner ? (
                <Text style={styles.homename}>{home_name}</Text>
              ) : (
                <Text style={styles.guestname}>{home_name}</Text>
              )}
            </View>
            <Text style={styles.codestyle}>초대코드 : {home_code} </Text>
          </View>
          <View style={styles.topright}>
            <View style={styles.logoutButton}>
              <Pressable
                // eslint-disable-next-line react/prop-types
                onPress={() => navigation.navigate('Room')}
                buttonType={ButtonTypes.DANGER}
              >
                <Text style={{ color: 'white' }}>방 나가기</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.notice}>
          <BlurView style={styles.blur} intensity={10} tint="light" />
          <TextAnimation />
        </View>
        <View style={styles.dashboard}>
          <View style={styles.temperature}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginLeft: 55,
                marginTop: 3,
              }}
            >
              실내 온도
            </Text>
            <View style={styles.tempIcon}>
              <FontAwesome name="thermometer-quarter" size={35} color="white" />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>
                8℃
              </Text>
            </View>
          </View>
          <View style={styles.air}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginLeft: 55,
                marginTop: 3,
              }}
            >
              실내 공기질
            </Text>
            <View style={styles.tempIcon}>
              <Entypo name="air" size={35} color="skyblue" />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>
                청정
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.musicbox}>
          {/* <BlurView style={styles.blur} intensity={4} tint="light" /> */}
          <View style={styles.imageWrapper}>
            <View style={styles.image}>
              <Image
                source={require('../../assets/NewJeans.png')}
                style={styles.image}
              />
            </View>
          </View>

          <Text style={styles.title}>Hype Boy</Text>
          <Text style={styles.artist}>NewJeans</Text>
          <View style={styles.music_icon}>
            {[
              {
                name: 'shuffle',
                action: () => {},
              },
              {
                name: 'skip-previous',
                action: () => {},
              },
              {
                name: isPlaying ? 'pause' : 'play-arrow',
                action: togglePlayback,
              },
              {
                name: 'skip-next',
                action: () => {},
              },
              {
                name: 'replay',
                action: () => {},
              },
            ].map((icon, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.icon_each,
                  pressed && { backgroundColor: '#3B306F' },
                ]}
                onPress={icon.action}
              >
                <MaterialIcons name={icon.name} size={35} color="white" />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.bottom}>
          <BlurView style={styles.blur} intensity={6} tint="light" />
          <Text style={styles.musiclist}>다음 곡 : </Text>
          <Text style={styles.listTitle}> FIESTA - 아이즈원</Text>
          <View style={styles.upIcon}>
            <Entypo name="chevron-up" size={24} color="white" />
          </View>
        </View>
      </ImageBackground>
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
    flex: 2,
    width: '100%',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //backgroundColor: '#2D1F6C',
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topleft: {
    width: 250,
    //backgroundColor: 'aqua',
    marginLeft: 18,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 18,
  },
  topIcon: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  homename: {
    fontSize: 23,
    marginLeft: 10,
    color: '#CFA3F1',
    textShadowColor: '#AF6BE4',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8, // 그림자의 블러 정도
  },
  guestname: {
    fontSize: 23,
    marginLeft: 10,
    color: '#09B4FF',
    textShadowColor: '#09B4FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3, // 그림자의 블러 정도
  },
  topright: {
    flexDirection: '',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  codestyle: {
    paddingTop: 20,
    fontSize: 14,
    color: 'lightgrey',
    marginLeft: 12,
  },
  logoutButton: {
    // backgroundColor: 'white',
    marginRight: 25,
  },
  notice: {
    flex: 1,
    fontSize: 20,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  dashboard: {
    flex: 1.6,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperature: {
    width: '49%',
  },
  tempIcon: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  air: {
    width: '49%',
  },
  musicbox: {
    flex: 8,
    width: '70%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#342483',
    borderRadius: 30,
    paddingTop: 15,
  },
  title: {
    fontSize: 25,
    padding: 10,
    height: 50,
    color: 'white',
    fontStyle: 'italic',
  },
  artist: {
    fontSize: 16,
    height: 20,
    color: 'white',
    fontStyle: 'italic',
  },
  imageWrapper: {
    width: 230,
    height: 230,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 215,
    height: 215,
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
  musiclist: {
    marginLeft: 34,
    fontSize: 16,
    color: 'white',
  },
  listTitle: {
    fontSize: 14,
    color: 'lightgrey',
  },
  upIcon: {
    marginLeft: 138,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
