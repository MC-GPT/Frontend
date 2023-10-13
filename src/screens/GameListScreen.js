import { StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const GameListScreen = ({ navigation }) => {
  const [jsonData, setJsonData] = useState([]);

  const getGames = async () => {
    try {
      const jsonData = await axios.get(
        'https://my-json-server.typicode.com/typicode/demo/posts'
      );
      setJsonData(jsonData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GameScreen</Text>
      <View style={styles.button}>
        {jsonData.map((v) => {
          return (
            <Button
              key={v.id}
              title={v.title}
              onPress={() => navigation.navigate('GamePlay')}
            />
          );
        })}
      </View>
    </View>
  );
};

GameListScreen.propTypes = {
  navigation: PropTypes.object,
};

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default GameListScreen;
