import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview'
import Loading from '../../components/Loading';
import GamePlayItem from '../../components/GamePlayItem';

import Network from '../../utils/network';

import styles from './styles';

export default class GameDetail extends Component {
  static navigationOptions = {
    title: '游戏详情',
    headerBackTitle: Platform.OS === 'ios' ? 'Back' : '返回'
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
    const { navigation } = this.props;
    
    if (loading) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.gameDetailPage}>
        <GamePlayItem gameInfo={gameInfo} navigation={navigation}></GamePlayItem>
        <View style={styles.gameDetailDescription}>
          <Text style={styles.gameDetailDescriptionTitle}>游戏介绍</Text>
          <HTMLView value={gameInfo.description.replace(/<br>/g, '')} />
        </View>
      </ScrollView>
    );
  }

  handleToGameOpecation(gameInfo) {
    if (gameInfo.id !== 288) {
      Alert.alert('游戏未上线，敬请期待');
      return
    }
    this.props.navigation.navigate('GamePlay', {
      title: gameInfo.name,
      uri: `${gameInfo.playLink}?id=${gameInfo.id}`,
    });
  }
}
