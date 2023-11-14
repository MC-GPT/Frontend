import React from 'react';
import { Text, Animated, Easing, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class TextAnimation extends React.Component {
  constructor() {
    super();
    this.screenWidth = Dimensions.get('window').width;
    this.animatedValue = new Animated.Value(-100);
  }

  componentDidMount() {
    this.animateText();
  }

  animateText() {
    Animated.loop(
      Animated.timing(this.animatedValue, {
        toValue: this.screenWidth,
        duration: 60000, // 1분 동안 애니메이션 진행
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateX: this.animatedValue }],
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="ios-megaphone-sharp" size={24} color="#CC2A2A" />
          <Text style={{ fontSize: 16, color: 'lightgrey', marginLeft: 8 }}>
            Notice :
          </Text>
          <Text style={{ fontSize: 17, color: 'white', marginLeft: 8 }}>
            🎅🏻 Merry Christmas ~~! 🎄
          </Text>
        </View>
      </Animated.View>
    );
  }
}

export default TextAnimation;
