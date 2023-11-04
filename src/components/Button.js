import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  DANGER,
  GRAY,
  PRIMARY,
  WHITE,
  ROOM,
  GUEST,
  GAME,
  APPLIANCES,
} from '../colors';
import { Octicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';

export const ButtonTypes = {
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER',
  CANCEL: 'CANCEL',
  ROOM: 'ROOM',
  GAME: 'GAME',
  GUEST: 'GUEST',
  APPLIANCES: 'APPLIANCES',
};

const ButtonTypeColors = {
  PRIMARY,
  DANGER,
  CANCEL: GRAY,
  ROOM,
  GUEST,
  GAME,

  APPLIANCES,
};

const Button = ({
  title,
  onPress,
  onLongPress,
  disabled,
  isLoading,
  styles,
  buttonType,
}) => {
  const Colors = ButtonTypeColors[buttonType];

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          defaultStyles.button,
          {
            backgroundColor: (() => {
              switch (true) {
                case disabled || isLoading:
                  return Colors.LIGHT;
                case pressed:
                  return Colors.DARK;
                default:
                  return Colors.DEFAULT;
              }
            })(),
            shadowColor: Colors.DEFAULT, // 네온사인 색상
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: pressed ? 1 : 0.9, // 눌렀을 때 더 강한 효과
            shadowRadius: 10,
          },
          styles?.button,
        ]}
      >
        <View style={defaultStyles.contentContainer}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={GRAY.DARK} />
          ) : (
            <>
              {buttonType === ButtonTypes.ROOM ? (
                // ROOM 버튼 유형인 경우 홈 아이콘을 렌더링
                <Octicons
                  name="home"
                  size={24}
                  color={WHITE}
                  style={defaultStyles.icon}
                />
              ) : null}
              {buttonType === ButtonTypes.GUEST ? (
                <Zocial
                  name="guest"
                  size={24}
                  color="white"
                  style={defaultStyles.icon}
                />
              ) : null}
              <Text style={defaultStyles.title}>{title}</Text>
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
};

Button.defaultProps = {
  buttonType: ButtonTypes.PRIMARY,
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  styles: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

export default Button;
