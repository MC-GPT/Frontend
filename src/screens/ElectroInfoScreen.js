import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const ElectroInfoScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
          <View style={styles.topLeft}>
            <View style={styles.backButton}>
              <Pressable onPress={() => navigation.navigate('Appliances')}>
                <MaterialIcons name="arrow-back-ios" size={25} color="white" />
              </Pressable>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>LG HomeBrew</Text>
            </View>
          </View>
          <View style={styles.image}>
            <Image
              style={styles.lightImg}
              source={require('../../assets/app/Beer.png')}
            />
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.power}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>전원</Text>
              <View style={styles.buttonWrapper}>
                <Pressable
                  style={({ pressed }) => [
                    styles.pressable,
                    { opacity: pressed ? 0.5 : 1 },
                  ]}
                >
                  <Image
                    style={styles.button}
                    source={require('../../assets/Button_on.png')}
                  />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.pressable,
                    { opacity: pressed ? 0.5 : 1 },
                  ]}
                >
                  <Image
                    style={styles.button}
                    source={require('../../assets/Button_off.png')}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.brightness}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>시간 </Text>
              <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                <Text style={styles.info}>브루잉 시작일 : 2023/11/15 </Text>
                <Text style={styles.info}>브루잉 완료 예정일 : 2023/11/22</Text>
              </View>
            </View>
          </View>
          <View style={styles.lightColor}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>모드</Text>
            </View>
          </View>
          <View style={styles.lightInfo}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>정보</Text>
              <View style={{ flexDirection: 'column', paddingTop: 30 }}>
                <Text style={styles.info}>Name : LG HomeBrew </Text>
                <Text style={styles.info}>Manufacturer : LG Electronics </Text>
                <Text style={styles.info}>Serial Number : 206 </Text>
                <Text style={styles.info}>Added Date : 2023/9/13 </Text>
                <Text style={styles.info}>Warranty : 2024/9/13 </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

ElectroInfoScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'green',
    flexDirection: 'row',
  },
  topLeft: {
    width: '50%',
  },
  backButton: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 25,
    //backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightImg: {
    height: 125,
    width: 120,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  name: {
    color: 'white',
    fontSize: 28,
    marginLeft: 14,
  },
  main: {
    flex: 3,
    width: '100%',
  },
  power: {
    height: 100,
    width: '100%',
    marginBottom: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingLeft: 150,
  },
  button: {
    marginHorizontal: 3,
  },
  brightness: {
    height: 100,
    width: '100%',
    marginBottom: 15,
  },
  lightColor: {
    height: 100,
    width: '100%',
    marginBottom: 15,
  },
  lightInfo: {
    height: 150,
    width: '100%',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  textWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: 'black',
    flexDirection: 'row',
    marginLeft: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  info: {
    fontSize: 15,
    color: 'lightgrey',
    marginLeft: 55,
  },
});

export default ElectroInfoScreen;
