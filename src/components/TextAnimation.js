import React from 'react';
import { Text, Animated, Easing, Dimensions, View } from 'react-native';

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
        duration: 120000, // 1분 동안 애니메이션 진행
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
          <Text style={{ fontSize: 16, color: 'lightgrey', marginLeft: 8 }}>
            현재 재생 중 :
          </Text>
          <Text style={{ fontSize: 16, color: 'white', marginLeft: 8 }}>
            Perfect Night - 르세라핌
          </Text>
        </View>
      </Animated.View>
    );
  }
}

export default TextAnimation;
