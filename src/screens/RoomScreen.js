import { StyleSheet, View } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import PropTypes from 'prop-types';
import Popup, { PopupTypes } from '../components/Popup';

const RoomScreen = ({ navigation }) => {
  const { setUser } = useUserContext();
  const [jsonData, setJsonData] = useState([]);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);

  // let jsonData = [
  //   { id: 1, name: '101호', code: '55501' },
  //   { id: 2, name: '102호', code: '53521' },
  //   { id: 3, name: '103호', code: '93991' },
  // ];

  //방 정보 받기 위한 axios 코드
  const getRoom = async () => {
    try {
      const value = await axios.get(
        'https://my-json-server.typicode.com/typicode/demo/posts'
      );
      setJsonData(value.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoom();
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="SIGNOUT"
          onPress={() => setUser(null)}
          buttonType={ButtonTypes.DANGER}
        />
      </View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.inputstyle}>
        {jsonData.map((v) => {
          return (
            <Button
              key={v.id}
              title={v.title}
              onPress={() => setVisibleBottom(true)}
            />
          );
        })}
      </View>
      <Button title={'방 생성'} onPress={() => setVisibleTop(true)}></Button>
      <Popup
        visible={visibleTop}
        onClose={() => setVisibleTop(false)}
        onSubmit={() =>
          navigation.navigate('ContentTab') & setVisibleTop(false)
        }
        popupType={PopupTypes.ROOMCREATE}
      ></Popup>
      <Popup
        visible={visibleBottom}
        onClose={() => setVisibleBottom(false)}
        onSubmit={() =>
          navigation.navigate('ContentTab') & setVisibleBottom(false)
        }
        popupType={PopupTypes.ROOMENTER}
      ></Popup>
    </View>
  );
};

RoomScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    marginRight: 10,
  },
  inputstyle: {
    width: '40%',
    PaddingBottom: 10,
  },
});

export default RoomScreen;