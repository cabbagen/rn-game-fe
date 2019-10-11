import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import Network from '../../utils/network';

import styles from './styles';

export default class Login extends Component {
  static navigationOptions = {
    title: '用户登录',
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <ScrollView style={styles.loginPage}>
        { this.renderGameLogoContent() }
        { this.renderLoginFormContent() }
        { this.renderLoginButtonContent() }
      </ScrollView>
    );
  }

  renderGameLogoContent() {
    return (
      <View style={styles.logoWrap}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>G</Text>
        </View>
      </View>
    );
  }

  renderLoginFormContent() {
    const { username, password } = this.state;

    return (
      <View style={styles.form}>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formItemInput}
            value={username}
            placeholder="请输入用户名"
            onChange={this.handleInputTextChange.bind(this, 'username')}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            secureTextEntry
            style={styles.formItemInput}
            value={password}
            placeholder="请输入密码"
            onChange={this.handleInputTextChange.bind(this, 'password')}
          />
        </View>
      </View>
    );
  }

  handleInputTextChange(type, event) {
    const value = event.nativeEvent.text && event.nativeEvent.text.trim();
    this.setState({ [type]: value });
  }

  renderLoginButtonContent() {
    return (
      <View style={styles.buttonWrap}>
        <TouchableOpacity activeOpacity={1} onPress={this.handleLogin.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>登录</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  handleLogin() {
    const { username, password } = this.state;

    Network.post('/user/login', { username, password }).then((result) => {
      if (result.status !== 200) {
        Alert.alert(result.msg);
        return
      }
      AsyncStorage.setItem('token', result.data).then(() => {
        this.props.navigation.goBack();
      });
    });
  }
}
