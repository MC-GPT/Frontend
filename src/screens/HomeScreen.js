import { Image, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom - 100 },
        ]}
      >
        <Text style={styles.notice}>공지사항</Text>
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
      </View>
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
  notice: {
    fontSize: 28,
  },
  musicbox: {
    flex: 1,
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9e42f5',
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
});

export default HomeScreen;
