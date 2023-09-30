import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../colors';

const TextButton = ({ title, onPress, hitSlop }) => {
  return (
    <Pressable
      style={styles.button}
      hitSlop={hitSlop ? hitSlop : 10}
      onPress={onPress}
    >
      <Text style={[styles.title]}>{title}</Text>
    </Pressable>
  );
};

TextButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  hitSlop: PropTypes.number,
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: PRIMARY.DEFAULT,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TextButton;
