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
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const idRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordconfirmRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(
      !name || !id || !password || password !== passwordConfirm || !nickname
    );
  }, [name, id, password, passwordConfirm, nickname]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await axios.post(
          'http://ec2-13-124-239-111.ap-northeast-2.compute.amazonaws.com:8080/signup',
          {
            account: id,
            name: name,
            nickname: nickname,
            password: password,
          }
        );
        setIsLoading(false);
        if (data.data === true) {
          Alert.alert('회원가입 성공, 로그인하세요');
          navigation.navigate('SignIn');
        } else {
          Alert.alert('회원가입 실패, 다시 시도하세요');
        }
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
          value={name}
          onChangeText={(text) => setName(text.trim())}
          title={'name'}
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
          onSubmitEditing={() => idRef.current.focus()}
        />
        <Input
          ref={idRef}
          value={id}
          onChangeText={(text) => setId(text.trim())}
          title={'ID'}
          placeholder={'your ID'}
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
