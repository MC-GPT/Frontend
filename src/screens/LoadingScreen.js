import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/nugu_neon.png')}
      style={[styles.container]}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
