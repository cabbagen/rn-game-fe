import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class LemmaGame extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '小游戏'),
    }
  }

  render() {
    const uri = this.props.navigation.getParam('uri', '');
    return (
      <WebView useWebKit startInLoadingState source={{ uri }} />
    );
  }
}
