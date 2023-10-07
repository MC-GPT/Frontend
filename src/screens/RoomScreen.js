import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import { useEffect, useState } from 'react';

const RoomScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  // const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   setDisabled(!code);
  // }, [code]);

  // const onSubmit = async () => {
  //   if (!disabled) {
  //     try {
  //       const data = await signIn(code);
  //       setUser(data);
  //     } catch (e) {
  //       Alert.alert('SignIn Failed', e, [
  //         {
  //           text: 'OK',
  //           onPress: () => setIsLoading(false),
  //         },
  //       ]);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.style}>
        <Text style={styles.text}>Room 1</Text>
        <View style={styles.inputstyle}>
          <Input
            value={code}
            onChangeText={(text) => setCode(text.trim())}
            title={'code'}
            placeholder={'코드 입력'}
            // onSubmitEditing={onSubmit}
          />
        </View>
        <Button
          title={'Enter'}
          onPress={() => navigation.navigate('ContentTab')}
        ></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 2</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'초대코드 입력'}> </Input>
        </View>
        <Button
          title={'Enter'}
          onPress={() => navigation.navigate('ContentTab')}
        ></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 3</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'초대코드 입력'}> </Input>
        </View>
        <Button
          title={'Enter'}
          onPress={() => navigation.navigate('ContentTab')}
        ></Button>
      </View>
      <View style={styles.style}>
        <Text style={styles.text}>Room 4</Text>
        <View style={styles.inputstyle}>
          <Input placeholder={'초대코드 입력'}> </Input>
        </View>
        <Button
          title={'Enter'}
          onPress={() => navigation.navigate('ContentTab')}
        ></Button>
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
