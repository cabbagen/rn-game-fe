import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';

import styles from './styles.js';

export default class GameRecordItem extends Component {
  render() {
    const { gameInfo } = this.props;

    return (
      <View style={styles.gamePlayItem}>
        <View style={styles.gamePlayItemImg}>
          <Image source={{ uri: gameInfo.gameImg, width: 60, height: 60 }} />
        </View>
        <View style={styles.gamePlayItemInfo}>
          <View>
            <Text>{gameInfo.gameName}</Text>
          </View>
          <View style={styles.gamePlayItemPlayWrap}>
            <Text style={styles.gamePlayItemPlayLine}>{`游戏分类：${gameInfo.gameCategoryName}`}</Text>
            <TouchableOpacity activeOpacity={1} onPress={this.handleToGameOpecation.bind(this, gameInfo)}>
              <Text style={[styles.gamePlayItemPlayBtn, styles.gamePlayItemPlayLine]}>去玩</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleToGameOpecation(gameInfo) {
    if (gameInfo.gameId !== 288) {
      Alert.alert('游戏未上线，敬请期待');
      return
    }
    this.props.navigation.navigate('GamePlay', {
      title: gameInfo.gameName,
      uri: `${gameInfo.gamePlayLink}?id=${gameInfo.gameId}`,
    });
  }
}
