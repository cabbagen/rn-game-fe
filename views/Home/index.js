import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Carousel, SearchBar } from '@ant-design/react-native';
import Loading from '../../components/Loading/index';
import Footer from '../../components/Footer/index';
import GameItem from '../../components/GameItem/index';

import Network from '../../utils/network';

import styles from './styles';

export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      banners: [],
      categories: [],

      scrollHeight: 0,
      searchValue: '',
    };
  }

  componentDidMount() {
    Network.get('/index/data').then((result) => {
      if (result.status === 401) {
        this.props.navigation.navigate('Login');
        return;
      }
      if (result.status !== 200) {
        return;
      }
      this.setState({
        loading: false,
        banners: result.data.banners,
        categories: result.data.categories
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    const extraSearchStyle = this.state.scrollHeight > 70
      ? { paddingTop: 24, backgroundColor: '#ffffff' }
      : {};

    return (
      <View style={styles.homePage}>
        <View style={[styles.homeSearch, extraSearchStyle]}>
          { this.renderSearchContent() }
        </View>
        <ScrollView scrollEventThrottle onScroll={this.handleScrollViewScroll.bind(this)}>
          { this.renderBannerContent() }
          { this.renderCategoriesContent() }
        </ScrollView>
      </View>
    );
  }

  renderSearchContent() {
    const { scrollHeight, searchValue } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="搜索"
          value={searchValue}
          styles={scrollHeight > 70 ? {} : styles}
          onChange={this.handleSearchChange.bind(this)}
          onSubmit={this.handleSearchSubmit.bind(this)}
        />
      </View>
    )
  }
  
  handleSearchChange(value) {
    this.setState({ searchValue: value.trim() })
  }

  handleSearchSubmit() {
    const { searchValue } = this.state;
    this.props.navigation.navigate('Search', { searchValue });
  }

  handleScrollViewScroll(event) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    this.setState({ scrollHeight });
  }

  renderBannerContent() {
    const { banners } = this.state;
    const nodes = banners.map((item, index) => {
      return (
        <View style={styles.homeCarouselItem} key={index}>
          <Image source={{uri: item}} style={{ width: '100%', height: 135 }} />
        </View>
      );
    });

    return (
      <Carousel autoplay infinite selectedIndex={0}>
        {nodes}
      </Carousel>
    );
  }

  renderCategoriesContent() {
    const { categories } = this.state;
    return (
      <View>
        { categories.map(this.renderCategoryContent.bind(this)) }
        <Footer />
      </View>
    );
  }

  renderCategoryContent(category, index) {
    return (
      <View key={index} style={styles.homeCategoryWrap}>
        <View>
          <Text style={styles.homeCategoryTitle}>{category.title}</Text>
        </View>
        <View>
          {category.games.map(this.renderCategoryGameContent.bind(this))}
        </View>
      </View>
    );
  }

  renderCategoryGameContent(game, index) {
    return (
      <GameItem
        key={index}
        game={game}
        navigation={this.props.navigation}
        style={{ marginTop: index === 0 ? 0 : 16 }}
      />
    );
  }
}
