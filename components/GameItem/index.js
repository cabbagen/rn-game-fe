import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class GameItem extends Component {
  render() {
    const { style, game } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.handleToGameDetail.bind(this, game)}>
        <View style={[styles.gameItem, style]}>
          <View>
            <Image source={{ uri: game.img, width: 65, height: 65  }} />
          </View>
          <View style={styles.gameInfo}>
            <View>
              <Text>{game.name}</Text>
            </View>
            <View>
              <Text>{`大小：${game.size}  下载量：${game.download}万次`}</Text>
              <Text>{game.developer}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleToGameDetail(game) {
    this.props.navigation.navigate('GameDetail', { gameId: game.id });
  }
}