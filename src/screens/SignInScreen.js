import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Button from '../components/Button';
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
import TextButton from '../components/TextButton';
import { PropTypes } from 'prop-types';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  // 로컬에 저장될 변수들
  const { setUser, setAccount, setNickname, setJwt } = useUserContext();

  useEffect(() => {
    setDisabled(!id || !password);
  }, [id, password]);

  const login = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await axios.post(
          'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/login',
          {
            account: id,
            password: password,
          }
        );
        setAccount(data.data.account);
        setNickname(data.data.nickname);
        setJwt(data.data.accessToken);
        setUser(data.status); // 넘기는 역할
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Alert.alert('로그인 실패');
      }
    }
  };

  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/nugu_neon.gif')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <Input
            value={id}
            onChangeText={(text) => setId(text.trim())}
            title={'ID'}
            placeholder={''}
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            iconName={IconNames.ID}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            title={'password'}
            secureTextEntry
            iconName={IconNames.PASSWORD}
            onSubmitEditing={login}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title={'로그인'}
                onPress={login}
                disabled={disabled}
                isLoading={isLoading}
              />
            </View>
            <View style={styles.textbutton}>
              <TextButton
                title="회원가입"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingTop: 200,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '90%',
  },
  textbutton: {
    marginTop: 20,
  },
});

export default SignInScreen;
