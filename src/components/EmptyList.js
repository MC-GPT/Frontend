import { Image, StyleSheet, Text, View } from 'react-native';
import { PRIMARY } from '../colors';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/LOGO.png')} style={styles.image} />
      <Text style={styles.title}>Music Playlist</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: PRIMARY.DARK,
    marginTop: 10,
  },
});

export default EmptyList;
