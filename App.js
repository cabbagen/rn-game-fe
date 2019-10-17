import React, { Component } from 'react';
import { Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './views/Home/index';
import SearchScreen from './views/Search/index';
import GameDetailScreen from './views/GameDetail/index';
import LoginScreen from './views/Login/index';
import GamePlayScreen from './views/gamePlay/index';

import CategoryScreen from './views/Category/index';
import GamesScreen from './views/Games/index';
import MyCenterScreen from './views/MyCenter/index';

import { mainColor, grayColor } from './theme';

const HomeScreenStack = createStackNavigator({
  Home: HomeScreen,
  Search: SearchScreen,
  GameDetail: GameDetailScreen,
  Login: LoginScreen,
  GamePlay: GamePlayScreen,
});

const CategoryScreenStack = createStackNavigator({
  Category: CategoryScreen,
  GameDetail: GameDetailScreen,
  GamePlay: GamePlayScreen,
});

const GamesScreenStack = createStackNavigator({
  Games: GamesScreen,
  GameDetail: GameDetailScreen,
  GamePlay: GamePlayScreen,
})

const AppNavigator = createBottomTabNavigator({
  Home: HomeScreenStack,
  Category: CategoryScreenStack,
  Games: GamesScreenStack,
  MyCenter: MyCenterScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const iconMap = {
        Home: 'ios-home',
        Category: 'ios-options',
        Games: 'ios-aperture',
        MyCenter: 'ios-person'
      };
      return (
        <Ionicons name={iconMap[navigation.state.routeName]} size={25} color={tintColor} />
      );
    },
    tabBarLabel: ({ focused, horizontal, tintColor }) => {
      const labelMap = {
        Home: '推荐',
        Category: '分类',
        Games: '玩过',
        MyCenter: '我的'
      };
      return <Text style={{ color: tintColor }}>{labelMap[navigation.state.routeName]}</Text>;
    }
  }),
  tabBarOptions: {
    activeTintColor: mainColor,
    inactiveTintColor: grayColor,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    this.setState({ isReady: true });
  }

  render() {
    const AppContainer = createAppContainer(AppNavigator);

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <AppContainer />;
  }
}