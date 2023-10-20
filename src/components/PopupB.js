import { Modal, Pressable, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button, { ButtonTypes } from './Button';
import Input, { KeyboardTypes } from './Input';

export const PopupTypesB = {
  LIGHT: 'LIGHT',
  ELECTRO: 'ELECTRO',
};

const PopupProps = {
  LIGHT: {
    title: '조명 추가',
    number: '시리얼 번호를 입력하세요',
    name: '이름을 입력하세요',
  },
  ELECTRO: {
    title: '가전 추가',
    number: '시리얼 번호를 입력하세요',
    name: '이름을 입력하세요',
  },
};

const Popup = ({ visible, onClose, onSubmit, popupType, ...props }) => {
  const { title, number, name } = PopupProps[popupType];
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable onPress={onClose} style={styles.background}></Pressable>
        <View style={styles.wrapper}>
          <View style={styles.popup}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{number}</Text>
            <View style={styles.inputstyle}>
              <Input
                {...props}
                title=""
                keyboardType={KeyboardTypes.NUMBER}
              ></Input>
            </View>
            <Text style={styles.message}>{name}</Text>
            <View style={styles.inputstyle}>
              <Input
                {...props}
                title=""
                keyboardType={KeyboardTypes.EMAIL}
              ></Input>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={'뒤로'}
                onPress={onClose}
                styles={buttonStyles}
                buttonType={ButtonTypes.CANCEL}
              ></Button>
              <Button
                title={'추가'}
                onPress={onSubmit}
                styles={buttonStyles}
                buttonType={ButtonTypes.PRIMARY}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

Popup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  popupType: PropTypes.oneOf(Object.values(PopupTypesB)),
};

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 145,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputstyle: {
    width: 200,
    height: 40,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 8,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 50,
  },
  message: {
    fontSize: 16,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 30,
  },
});

export default Popup;
