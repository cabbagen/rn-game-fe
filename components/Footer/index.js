import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>---</Text>
        <Text style={styles.footerText}>   哎呦，到底了   </Text>
        <Text style={styles.footerText}>---</Text>
      </View>
    );
  }
}