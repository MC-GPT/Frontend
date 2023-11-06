import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import PropTypes from 'prop-types';

const ElectroInfoScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeInputView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.title}>개별 가전 제어</Text>
      </ImageBackground>
    </SafeInputView>
  );
};

ElectroInfoScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default ElectroInfoScreen;
