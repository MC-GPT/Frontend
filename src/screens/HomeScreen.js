import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from 'react-native';
import { WHITE } from '../colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import { ButtonTypes } from '../components/Button';
import { useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { BlurView } from 'expo-blur';
import { FontAwesome, Octicons, Zocial } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// eslint-disable-next-line react/prop-types
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { home_name, home_code, owner } = useMainContext();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/home_background.gif')}
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: 'lightgrey', marginLeft: 8 }}>
              공지 :
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                marginLeft: 8,
                fontStyle: 'italic',
              }}
            >
              Happy New Year ~~! 🎉
            </Text>
          </View>
        </View>
        <View style={styles.center}></View>
        <View style={styles.bottom}>
          <Text style={{ marginLeft: 60, color: 'lightgrey', marginBottom: 5 }}>
            Music Playlist generated by GPT 4.0
          </Text>
          <View style={styles.musicBox}>
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              style={styles.gradientOverlay}
            />
            <View style={styles.imageBorder}>
              <Image
                style={styles.album}
                source={require('../../assets/NewJeans.png')}
              />
            </View>

            <View style={styles.musicPlay}>
              <Text style={styles.musicTitle}>Hype Boy</Text>
              <Text style={styles.artist}>NewJeans</Text>
              <View style={styles.musicIcon}>
                <FontAwesome
                  name="backward"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Pressable
                  onPress={togglePlay}
                  style={({ pressed }) => [
                    styles.pressable,
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  <FontAwesome
                    name={isPlaying ? 'pause' : 'play'}
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </Pressable>
                <FontAwesome
                  name="forward"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

HomeScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  top: {
    flex: 3,
    width: '100%',
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
    textShadowRadius: 8,
  },
  guestname: {
    fontSize: 23,
    marginLeft: 10,
    color: '#09B4FF',
    textShadowColor: '#09B4FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 10,
  },
  bottom: {
    flex: 5,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  musicBox: {
    width: 350,
    height: 140,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'white',
    borderTopWidth: 0.5,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    flexDirection: 'row',
  },
  imageBorder: {
    width: '40%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 16,
    borderRightWidth: 0.5,
    borderColor: 'white',
  },
  album: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  musicPlay: {
    width: '55%',
  },
  musicTitle: {
    flex: 1,
    marginLeft: 43,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Verdana',
    fontStyle: 'italic',
    color: 'white',
  },
  artist: { flex: 1, marginLeft: 58, marginTop: 10, color: 'white' },
  musicIcon: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 2,
  },
  icon: {
    marginHorizontal: 15,
    color: 'white',
  },
});

export default HomeScreen;
