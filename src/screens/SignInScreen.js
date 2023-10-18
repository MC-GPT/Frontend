import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const { setUser, setId } = useUserContext();

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const login = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await axios.post('https://reqres.in/api/login', {
          email: email,
          password: password,
        });
        setUser(data.status);
        setId(email);
      } catch (e) {
        setIsLoading(false);
        Alert.alert('로그인 실패');
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
        <Image
          source={require('../../assets/LOGO.png')}
          style={styles.image}
          resizeMode={'cover'}
        />
        {/* </View> */}
        <Input
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
          iconName={IconNames.PASSWORD}
          onSubmitEditing={login}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={'로그인'}
            onPress={login}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TextButton
            title="회원가입"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
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

export default SignInScreen;
