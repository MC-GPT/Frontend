import { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PropTypes } from 'prop-types';
import TextButton from '../components/TextButton';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const emailRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordconfirmRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(
      //!username ||
      !email || !password || password !== passwordConfirm
      // ||
      //nickname
    );
  }, [username, email, password, passwordConfirm, nickname]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        // eslint-disable-next-line no-unused-vars
        const data = await axios.post('https://reqres.in/api/register', {
          //username,
          email,
          password,
          //nickname
        });
        setIsLoading(false);
        Alert.alert('회원가입 성공, 로그인하세요');
        navigation.navigate('SignIn');
      } catch (e) {
        setIsLoading(false);
        Alert.alert('회원가입 실패');
      }
    }
  };

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* <View style={StyleSheet.absoluteFillObject}> */}
        {/* </View> */}
        <Input
          value={username}
          onChangeText={(text) => setUsername(text.trim())}
          title={'username'}
          placeholder={'name'}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.USERNAME}
          onSubmitEditing={() => nicknameRef.current.focus()}
        />
        <Input
          ref={nicknameRef}
          value={nickname}
          onChangeText={(text) => setNickname(text.trim())}
          title={'nickname'}
          placeholder={'nickname'}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.HAPPY}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <Input
          ref={emailRef}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          title={'email'}
          placeholder={'your@email.com'}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          title={'password'}
          secureTextEntry
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.PASSWORD}
          onSubmitEditing={() => passwordconfirmRef.current.focus()}
        />

        <Input
          ref={passwordconfirmRef}
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text.trim())}
          title={'passwordconfirm'}
          secureTextEntry
          returnKeyType={ReturnKeyTypes.DONE}
          iconName={IconNames.PASSWORD}
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={'회원가입'}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TextButton
            title="로그인화면으로 이동"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </SafeInputView>
  );
};

SignUpScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 250,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SignUpScreen;
