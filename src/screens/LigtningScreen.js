import { Alert, StyleSheet, View } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PopupB, { PopupTypesB } from '../components/PopupB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useMainContext } from '../contexts/MainContext';

const LightningScreen = ({ navigation }) => {
  const { apps } = useMainContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleLight, setVisibleLight] = useState(false);
  const [input, setInput] = useState('');
  // let jsonData = [
  //   { id: 1, name: '101호', code: '55501' },
  //   { id: 2, name: '102호', code: '53521' },
  //   { id: 3, name: '103호', code: '93991' },
  // ];

  useEffect(() => {
    setJsonData(apps);
  }, []);

  const onSubmit = () => {
    Alert.alert('입력완료');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Input
          value={input}
          onChangeText={(text) => setInput(text.trim())}
          title={'원하는 조명을 입력하세요'}
          placeholder={''}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.DONE}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.roomButton}>
          {jsonData
          .filter((v) => v.light)
          .map((v) => {
            return (
              <Button
                key={v.id}
                title={v.name}
                onPress={() => navigation.navigate('Mood')}
                buttonType={ButtonTypes.ROOM}
                styles={buttonStyles}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.createButton}>
          <Button
            title={'조명 추가'}
            onPress={() => setVisibleLight(true)}
          ></Button>
        </View>
      </View>
      <PopupB
        visible={visibleLight}
        onClose={() => setVisibleLight(false)}
        onSubmit={() => setVisibleLight(false)}
        popupType={PopupTypesB.LIGHT}
      ></PopupB>
    </SafeAreaView>
  );
};

LightningScreen.propTypes = {
  navigation: PropTypes.object,
};

const buttonStyles = StyleSheet.create({
  container: {
    width: 140,
    // backgroundColor: 'black',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 140,
    borderRadius: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  top: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginLeft: 105,
  },
  logoutButton: {
    marginLeft: 60,
  },
  main: {
    flex: 5,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomButton: {
    // backgroundColor: 'aqua',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 35,
  },
  bottom: {
    flex: 2,
    width: '100%',
    // backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    // backgroundColor: 'black',
    flex: 1,
    width: 320,
    justifyContent: 'top',
  },
});

export default LightningScreen;
