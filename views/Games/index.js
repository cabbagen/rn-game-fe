import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Games extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  render() {
    return (
      <View style={styles.gamesPage}>
        {this.renderBannerContent()}
        {this.renderPlayedGamesContent()}
      </View>
    );
  }

  renderBannerContent() {
    return (
      <View style={styles.gamesBanner}>
        <Text style={styles.gamesBannerText}>游戏排行榜</Text>
      </View>
    );
  }

  renderPlayedGamesContent() {
    return (
      <View style={styles.gamesPlayedWrap}>
        <View>
          <Text style={styles.gamesPlayedTitle}>最近玩过</Text>
        </View>
      </View>
    );
  }
}
