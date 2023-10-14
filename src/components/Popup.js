import { Modal, Pressable, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button, { ButtonTypes } from './Button';
import Input from './Input';

export const PopupTypes = {
  ROOMCREATE: 'ROOMCREATE',
  ROOMENTER: 'ROOMENTER',
};

const PopupProps = {
  ROOMCREATE: {
    title: '방 생성',
    message: '방 제목을 입력하세요',
  },
  ROOMENTER: {
    title: '방 입장',
    message: '코드를 입력하세요',
  },
};

const Popup = ({ visible, onClose, onSubmit, popupType }) => {
  const { title, message } = PopupProps[popupType];
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable onPress={onClose} style={styles.background}></Pressable>
        <View style={styles.popup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Input title=""></Input>
          <View style={styles.buttonContainer}>
            <Button
              title={'뒤로'}
              onPress={onClose}
              styles={buttonStyles}
              buttonType={ButtonTypes.CANCEL}
            ></Button>
            <Button
              title={'확인'}
              onPress={onSubmit}
              styles={buttonStyles}
              buttonType={ButtonTypes.PRIMARY}
            ></Button>
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
  popupType: PropTypes.oneOf(Object.values(PopupTypes)),
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
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default Popup;
