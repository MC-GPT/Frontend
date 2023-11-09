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
import favicon from '../../assets/favicon.png';
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
              <Text style={styles.name}>가전 이름</Text>
            </View>
          </View>
          <View style={styles.image}>
            <Image style={styles.lightImg} source={favicon} />
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.power}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>전원</Text>
            </View>
          </View>
          <View style={styles.brightness}>
            <BlurView style={styles.blur} intensity={10} tint="light" />
            <View style={styles.textWrapper}>
              <Text style={styles.title}> 바람 세기</Text>
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
    height: 100,
    width: 100,
    opacity: 0.3,
    borderRadius: 10,
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  name: {
    color: 'white',
    fontSize: 30,
  },
  main: {
    flex: 3,
    width: '100%',
  },
  power: {
    height: 100,
    width: '100%',
    marginBottom: 15,
    //backgroundColor: 'black',
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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});

export default ElectroInfoScreen;
