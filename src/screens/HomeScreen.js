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

// eslint-disable-next-line react/prop-types
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { home_name, home_code } = useMainContext();
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
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.top}>
          <Text style={styles.homename}>{home_name}</Text>
          <View style={styles.topright}>
            <View style={styles.logoutButton}>
              <Pressable
                // eslint-disable-next-line react/prop-types
                onPress={() => navigation.navigate('Room')}
                buttonType={ButtonTypes.DANGER}
              >
                <Text style={{ color: 'white' }}>방 나가기</Text>
                {/* <MaterialIcons name="logout" size={24} color="black" /> */}
              </Pressable>
            </View>
            <Text style={styles.codestyle}>초대코드 : {home_code} </Text>
          </View>
        </View>
        <View style={styles.notice}>
          <TextAnimation />
        </View>
        <View style={styles.dashboard}>
          <Text> dashboard </Text>
        </View>
        <View style={styles.musicbox}>
          <View style={styles.image}>
            <Image
              source={require('../../assets/NewJeans.png')}
              style={styles.image}
            />
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
                  pressed && { backgroundColor: 'lightgrey' },
                ]}
                onPress={icon.action}
              >
                <MaterialIcons name={icon.name} size={30} color="black" />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.musiclist}>Music list</Text>
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
    // backgroundColor: 'green',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homename: {
    fontSize: 22,
    marginLeft: 20,
    color: 'white',
  },
  topright: {
    flexDirection: '',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  codestyle: {
    paddingTop: 20,
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    // backgroundColor: 'white',
  },
  notice: {
    flex: 1,
    fontSize: 20,
    marginTop: 10,
  },
  dashboard: {
    flex: 1,
  },
  musicbox: {
    flex: 8,
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9e42f5',
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
    flex: 1,
    // backgroundColor: 'blue',
  },
  musiclist: { fontSize: 20 },
});

export default HomeScreen;
