import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SearchBar } from '@ant-design/react-native';
import GameItem from '../../components/GameItem/index';
import Footer from '../../components/Footer/index';

import Network from '../../utils/network';

import styles from './styles';

export default class Search extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      games: [],
      pagination: {
        pageNo: 0,
        pageSize: 10,
        total: 0,
      },
    };
    this.gameScrollView = null;
  }

  componentDidMount() {
    const searchValue = this.props.navigation.getParam('searchValue', '');
    this.fetchLikeGames('submit', searchValue);
  }

  fetchLikeGames(type, searchValue) {
    const { games, pagination } = this.state;
    const params = {
      searchKey: searchValue,
      pageNo: type === 'submit' ? 0 : pagination.pageNo,
      pageSize: pagination.pageSize,
    };

    Network.get('/game/games/like', params).then((result) => {
      if (result.status !== 200) {
        return;
      }
      this.setState({
        searchValue,
        games: type === 'submit' ? result.data.games : games.concat(...result.data.games),
        pagination: Object.assign({}, pagination, {
          pageNo: params.pageNo + 1,
          pageSize: pagination.pageSize,
          total: result.data.total,
        })
      }, () => {
        if (type === 'submit' && this.gameScrollView) {
          setTimeout(() => {
            this.gameScrollView.scrollTo({ x: 0, y: 0, animated: true });
          }, 100);
        }
      });
    })
  }

  render() {
    return (
      <View style={styles.searchPage}>
        <View style={styles.searchWrap}>
          <SearchBar
            placeholder="搜索"
            value={this.state.searchValue}
            onChange={this.handleSearchChange.bind(this)}
            onSubmit={this.handleSearchSubmit.bind(this)}
          />
        </View>
        <View style={styles.searchGames}>
          {this.renderGamesContent()}
        </View>
      </View>
    );
  }

  handleSearchChange(value) {
    this.setState({ searchValue: value.trim() })
  }

  handleSearchSubmit() {
    this.fetchLikeGames('submit', this.state.searchValue);
  }

  renderGamesContent() {
    const { games } = this.state;

    if (games.length === 0) {
      return this.renderGameEmptyContent();
    }

    const nodes = this.state.games.map((game, index) => {
      return (
        <GameItem
          key={index}
          game={game}
          navigation={this.props.navigation}
          style={{ marginTop: index === 0 ? 0 : 16 }}
        />
      )
    });

    return (
      <ScrollView
        scrollEventThrottle
        ref={target => this.gameScrollView = target}
        onScroll={this.handleScrollViewScroll.bind(this)}
      >
        {nodes}
        {this.renderFooterContent()}
      </ScrollView>
    )
  }

  renderGameEmptyContent() {
    return (
      <View style={styles.searchEmptyWrap}>
        <Text style={styles.searchEmptyText}>暂无内容</Text>
      </View>
    );
  }

  handleScrollViewScroll(event) {
    const { games, pagination, searchValue } = this.state;

    const offsetY = event.nativeEvent.contentOffset.y;
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height;
    const contentSizeHeight = Math.round(event.nativeEvent.contentSize.height);

    if (Math.round(offsetY + oriageScrollHeight) >= contentSizeHeight && games.length !== pagination.total) {
      this.fetchLikeGames('add', searchValue);
    }
  }

  renderFooterContent() {
    const { games, pagination } = this.state;

    if (games.length !== pagination.total) {
      return null;
    }
    return <Footer />;
  }
}
