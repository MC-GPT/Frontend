import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
// import axios from 'axios';

const CodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>코드를 입력하세요</Text>
      <Input
        value={code}
        onChangeText={(text) => setCode(text.trim())}
        title={''}
        secureTextEntry
        onSubmitEditing={() => onSubmit()}
      />
      <Button
        title={'입장'}
        onPress={() => {
          navigation.navigate('ContentTab');
        }}
      ></Button>
    </View>
  );
};

CodeScreen.propTypes = {
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

export default CodeScreen;
