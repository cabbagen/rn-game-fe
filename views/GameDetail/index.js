import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview'
import Loading from '../../components/Loading';

import Network from '../../utils/network';

import styles from './styles';

export default class GameDetail extends Component {
  static navigationOptions = {
    title: '游戏详情'
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameInfo: {},
    };
  }

  componentDidMount() {
    Network.get(`/game/game/${this.props.navigation.getParam('gameId', '')}`).then((result) => {
      if (result.status !== 200) {
        return;
      }
      this.setState({ loading: false, gameInfo: result.data });
    });
  }

  render() {
    const { loading, gameInfo } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.gameDetailPage}>
        <View style={styles.gameDetailTop}>
          <View style={styles.gameDetailTopImg}>
            <Image source={{ uri: gameInfo.img, width: 60, height: 60 }} />
          </View>
          <View style={styles.gameDetailTopInfo}>
            <View>
              <Text>{gameInfo.name}</Text>
            </View>
            <View style={styles.gameDetailPlayWrap}>
              <Text style={styles.gameDetailPlayLine}>{`下载量：${gameInfo.download}万次`}</Text>
              <TouchableOpacity activeOpacity={1} onPress={this.handleToGameOpecation.bind(this, gameInfo)}>
                <Text style={[styles.gameDetailPlayBtn, styles.gameDetailPlayLine]}>去玩</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.gameDetailDescription}>
          <Text style={styles.gameDetailDescriptionTitle}>游戏介绍</Text>
          <HTMLView value={gameInfo.description.replace(/<br>/g, '')} />
        </View>
      </ScrollView>
    );
  }

  handleToGameOpecation(gameInfo) {
    console.log('game', gameInfo)
    // this.props.navigation.navigate('')
  }
}
