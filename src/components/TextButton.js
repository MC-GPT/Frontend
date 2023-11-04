import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../colors';

const TextButton = ({ title, onPress, hitSlop }) => {
  return (
    <Pressable
      style={styles.button}
      hitSlop={hitSlop ? hitSlop : 10}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
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
    color: PRIMARY.LIGHT,
    fontWeight: '700',
    fontSize: 16,
    // 네온사인 효과 스타일
    textShadowColor: PRIMARY, // 네온사인 효과 색상
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8, // 네온사인 효과 강도
  },
});

export default TextButton;
