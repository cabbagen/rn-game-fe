import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import GameRecordItem from '../../components/GameRecordItem';
import Footer from '../../components/Footer';

import Network from '../../utils/network';

import styles from './styles';

export default class Games extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      pageSize: 5,
      records: [],
    }
  }

  componentWillMount() {
    this.fetchGameRecords();
  }

  fetchGameRecords() {
    const { pageNo, pageSize, records } = this.state;
    Network.get('/record/records', { pageNo, pageSize }).then(result => {
      if (result.status === 200) {
        this.setState({ records: records.concat(result.data.records) });
      }
    })
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
    const { records } = this.state;
    const { height } =  Dimensions.get('window');

    return (
      <View style={styles.gamesPlayedWrap}>
        <View>
          <Text style={styles.gamesPlayedTitle}>最近玩过</Text>
        </View>
        <ScrollView
          style={{height: height - 300}}
          scrollEventThrottle
          onScroll={this.handleGameRecordsScroll.bind(this)}
        >
          {records.map(this.renderGameRecordItem.bind(this))}
          <Footer />
        </ScrollView>
      </View>
    );
  }

  renderGameRecordItem(gameInfo, index) {
    const { navigation } = this.props;
    return (
      <View key={index} style={{marginBottom: 10}}>
        <GameRecordItem navigation={navigation} gameInfo={gameInfo} />
      </View>
    );
  }

  handleGameRecordsScroll() {
    this.setState({ pageNo: this.state.pageNo + 1 }, () => {
      this.fetchGameRecords();
    });
  }
}
