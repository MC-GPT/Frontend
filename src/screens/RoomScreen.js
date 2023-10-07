import { Alert, StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { codeIn } from '../api/room';

const RoomScreen = () => {
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');

  const { setRoom } = useUserContext();

  useEffect(() => {
    setDisabled(!code);
  }, [code]);

  const onSubmit = async () => {
    if (!disabled) {
      try {
        const data = await codeIn(code);
        setRoom(data);
      } catch (e) {
        Alert.alert('방 입장 실패', e, [
          {
            text: 'OK',
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.style}>
        <Text style={styles.text}>Room 1</Text>
        <View style={styles.inputstyle}>
          <Input
            value={code}
            onChangeText={(text) => setCode(text.trim())}
            placeholder={'코드 입력'}
            onSubmitEditing={onSubmit}
          />
        </View>
        <Button title={'Enter'} disabled={disabled} onPress={onSubmit}></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 2</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'코드 입력'} onSubmitEditing={onSubmit} />
        </View>
        <Button title={'Enter'} disabled onPress={onSubmit}></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 3</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'코드 입력'} onSubmitEditing={onSubmit} />
        </View>
        <Button title={'Enter'} disabled onPress={onSubmit}></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 4</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'코드 입력'} onSubmitEditing={onSubmit} />
        </View>
        <Button title={'Enter'} disabled onPress={onSubmit}></Button>
      </View>
    </View>
  );
};

RoomScreen.propTypes = {};

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
  },
});

export default RoomScreen;
