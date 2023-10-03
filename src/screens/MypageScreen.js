import { StyleSheet, View } from 'react-native';
// import PropTypes from 'prop-types';
import { WHITE } from '../colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const MypageScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.settingbutton}>
        <Button
          title={'Settings'}
          onPress={() => navigation.navigate('Settings')}
        ></Button>
      </View>
    </View>
  );
};
MypageScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 30,
  },
  settingbutton: {},
});

export default MypageScreen;
