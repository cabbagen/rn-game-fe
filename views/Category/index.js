import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GameItem from '../../components/GameItem/index';
import Loading from '../../components/Loading/index';
import Footer from '../../components/Footer';

import Network from '../../utils/network';

import styles from './styles';

export default class Category extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      // 分类相关
      categories: [],
      selectedIndex: 0,

      // 列表相关
      games: [],
      pagination: {
        pageNo: 0,
        pageSize: 10,
        total: 0,
      }
    };
    this.gameScrollView = null;
  }

  componentDidMount() {
    const { pageNo, pageSize } = this.state.pagination;

    Promise.all([
      Network.get('/game/categories'),
      Network.get('/game/games', { categoryId: 1, pageNo, pageSize }),
    ])
    .then(([categoryResult, gameResult]) => {
      if (categoryResult.status !== 200 || gameResult.status !== 200) {
        return;
      }
      this.setState({
        loading: false,
        games: gameResult.data.games,
        categories: categoryResult.data,
        pagination: Object.assign({}, this.state.pagination, {
          pageNo: pageNo + 1,
          total: gameResult.data.total,
        }),
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <View style={styles.categoryPage}>
        {this.renderCategoryNavigationContent()}
        {this.renderGamesContent()}
      </View>
    );
  }

  renderCategoryNavigationContent() {
    const { categories } = this.state;
    return (
      <ScrollView
        horizontal
        style={styles.categoryNav}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(this.renderNavItemContent.bind(this))}
      </ScrollView>
    )
  }

  renderNavItemContent(category, index) {
    const { selectedIndex } = this.state;
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={this.handleSwitchCategory.bind(this, index)}
      >
        <View style={selectedIndex === index ? styles.selectedCategoryNavItem : {}}>
          <Text style={styles.categoryNavItem}>
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleSwitchCategory(index) {
    this.fetchGames('switch', index);
  }

  renderGamesContent() {
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
        style={styles.categoryGames}
        ref={target => this.gameScrollView = target}
        onScroll={this.handleScrollViewScroll.bind(this)}
      >
        {nodes}
        {this.renderFooterContent()}
      </ScrollView>
    );
  }

  handleScrollViewScroll(event) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height;
    const contentSizeHeight = Math.round(event.nativeEvent.contentSize.height);

    if (Math.round(offsetY + oriageScrollHeight) >= contentSizeHeight) {
      this.fetchGames('add', this.state.selectedIndex);
    }
  }

  fetchGames(type, selectedIndex) {
    const { categories, pagination, games } = this.state;

    // 已加载全部
    if (selectedIndex === this.state.selectedIndex && pagination.total === games.length) {
      return;
    }

    const params = {
      categoryId: categories[selectedIndex].id,
      pageNo: selectedIndex !== this.state.selectedIndex ? 0 : pagination.pageNo,
      pageSize: pagination.pageSize,
    };
    Network.get('/game/games', params).then((result) => {
      if (result.status !== 200) {
        return;
      }
      const newGames = type === 'switch' ? result.data.games : games.concat(...result.data.games);
      this.setState({
        selectedIndex,
        games: newGames,
        pagination: Object.assign({}, pagination, { pageNo: params.pageNo + 1, total: result.data.total }),
      }, () => {
        if (type === 'switch' && this.gameScrollView) {
          setTimeout(() => {
            this.gameScrollView.scrollTo({ x: 0, y: 0, animated: true });
          }, 100);
        }
      });
    });
  }

  renderFooterContent() {
    const { games, pagination } = this.state;

    if (games.length !== pagination.total) {
      return null;
    }
    return <Footer />;
  }
}
