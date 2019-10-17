import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Image, Alert } from 'react-native';
import Loading from '../../components/Loading/index';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Network from '../../utils/network';
import { marsColor, venusColor } from '../../theme';

import styles from './styles';

export default class MyCenter extends Component {
  static navigationOptions = {
    title: '我的'
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    Network.get('/user/userInfo').then((result) => {
      if (result.status !== 200) {
        return;
      }
      this.setState({ loading: false, userInfo: result.data });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <View style={styles.myCenterPage}>
        <View style={styles.backgroundTop}>
          {this.renderUserInfoContent()}
          {this.renderUserExitButton()}
        </View>
        <View style={styles.contentBottom}>
          {this.renderEmptyContent()}
        </View>
      </View>
    );
  }

  renderUserInfoContent() {
    const { userInfo } = this.state;
    return (
      <View style={styles.userInfo}>
        <View style={styles.userInfoItem}>
          <Image resizeMode='contain' style={styles.userInfoItemImg} imageStyle={{ borderRadius: 40 }} source={{ uri: userInfo.avatar }} />
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoItemText}>{userInfo.nickname}</Text>
          <Ionicons
            size={16}
            style={styles.userIcon}
            color={userInfo.gender === 1 ? marsColor : venusColor}
            name={userInfo.gender === 1 ? 'mars' : 'venus'}
          />
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoItemText}>{ userInfo.extra || '这个人很懒，什么都没有留下...' }</Text>
        </View>
      </View>
    );
  }

  renderUserExitButton() {
    return (
      <View style={styles.userExit}>
        <Text style={styles.userExitText} onPress={this.handleUserExit.bind(this)}>退出</Text>
      </View>
    );
  }

  handleUserExit() {
    Alert.alert(
      '温馨提示',
      '您确定要退出吗',
      [
        { text: '取消' },
        { text: '确定', onPress: this.handleRemoveToken.bind(this)}
      ],
      { cancelable: false }
    );
  }

  handleRemoveToken() {
    AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.navigate('Login');
    });
  }

  renderEmptyContent() {
    return (
      <View style={styles.emptyContent}>
        <View style={styles.emptyContentItem}>
          <Image source={require('../../resource/images/empty.png')} />
        </View>
        <View style={styles.emptyContentItem}>
          <Text style={styles.emptyContentItemText}>暂无内容，敬请期待</Text>
        </View>
      </View>
    );
  }
}
