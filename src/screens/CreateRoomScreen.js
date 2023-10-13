import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
// import axios from 'axios';

const CreateRoomScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>방 제목을 입력하세요</Text>
      <Input
        value={name}
        onChangeText={(text) => setName(text.trim())}
        title={''}
        secureTextEntry
        onSubmitEditing={() => onSubmit()}
      />
      <Button
        title={'생성'}
        onPress={() => {
          navigation.navigate('ContentTab');
        }}
      ></Button>
    </View>
  );
};

CreateRoomScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default CreateRoomScreen;
