import React, { Component } from 'react';
import { WebView, AsyncStorage } from 'react-native';

export default class LemmaGame extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '小游戏'),
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
    this.webview = null;
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then(value => {
      this.setState({ token: value })
    })
  }

  render() {
    const uri = this.props.navigation.getParam('uri', '');

    if (!this.state.token) {
      return null
    }

    return (
      <WebView
        useWebKit
        source={{ uri }}
        javaScriptEnabled
        startInLoadingState
        ref={webview => this.webview = webview}
        onLoadEnd={this.handleWebViewLoadEnd.bind(this)}
      />
    );
  }

  handleWebViewLoadEnd() {
    this.webview.postMessage(this.state.token);
  }
}
