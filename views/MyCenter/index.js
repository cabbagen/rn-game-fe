import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

// import Network from '../../utils/network';

import styles from './styles';

export default class MyCenter extends Component {
  static navigationOptions = {
    title: '我的'
  }

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {

  }

  handleFetchUserInfo() {
  }

  render() {
    return (
      <View style={styles.myCenterPage}>
        <View style={styles.backgroundTop}>
          { this.renderUserInfoContent() }
          { this.renderUserExitButton() }
        </View>
        <View style={styles.contentBottom}>
          { this.renderEmptyContent() }
        </View>
      </View>
    );
  }

  renderUserInfoContent() {
    return (
      <View style={styles.userInfo}>
        <View style={styles.userInfoItem}>
          <Image
            resizeMode='contain'
            style={styles.userInfoItemImg}
            imageStyle={{ borderRadius: 40 }}
            source={{ uri: 'http://localhost:9090/static/images/avatar.jpg' }}
          />
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoItemText}>任性的毛豆</Text>
          <Ionicons style={styles.userIcon} size={16} color="#ff0000" name="venus" />
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoItemText}>这个人很懒，什么都没有留下...</Text>
        </View>
      </View>
    );
  }

  renderUserExitButton() {
    return (
      <View style={styles.userExit}>
        <Text style={styles.userExitText}>退出</Text>
      </View>
    );
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
