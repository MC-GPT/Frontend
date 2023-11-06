import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const HeaderLeftButton = ({ canGoBack, tintColor }) => {
  const navigation = useNavigation();

  if (!canGoBack) {
    return null;
  }

  const pressableStyle = {
    backgroundColor: 'transparent', // 배경을 투명하게 설정
  };

  return (
    <Pressable style={pressableStyle} onPress={navigation.goBack} hitSlop={10}>
      <MaterialCommunityIcons name="chevron-left" size={30} color={tintColor} />
    </Pressable>
  );
};

HeaderLeftButton.propTypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
