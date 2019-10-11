import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/EvilIcons';

import { mainColor } from '../../theme';
import styles from './styles';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);

    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
   }).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View>
        <Animated.View style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}>
          <Ionicons name="spinner-3" size={30} color={mainColor} />
        </Animated.View>
        <View style={styles.loadingText}>
          <Text style={{ color: '#cccccc' }}>加载中</Text>
        </View>
      </View>
    );
  }
}