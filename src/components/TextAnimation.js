import { Component } from 'react';
import { Text, Animated, Easing, Dimensions } from 'react-native';

class TextAnimation extends Component {
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
        duration: 13000, // 13초 동안 애니메이션 진행
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
        <Text style={{ fontSize: 20 }}>공지 : 변기에 물티슈 넣지 마세요</Text>
      </Animated.View>
    );
  }
}

export default TextAnimation;
