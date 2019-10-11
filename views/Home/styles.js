import { StyleSheet } from 'react-native';

import { mainColor } from '../../theme';

export default StyleSheet.create({
  homePage: {
    position: 'relative',
  },
  homeSearch: {
    width: '100%',
    height: 45,
    position: 'absolute',
    zIndex: 10,
    paddingTop: 14,
  },
  wrapper: {
    backgroundColor: 'transparent'
  },
  input: {
    borderColor: 'transparent'
  },
  homeCarouselItem: {
    height: 120,
  },
  homeCategoryWrap: {
    paddingHorizontal: 8,
  },
  homeCategoryTitle: {
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    color: mainColor,
  },
  homeGameItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  homeGameInfo: {
    display: 'flex',
    marginLeft: 8,
    paddingVertical: 5,
    justifyContent: 'space-between',
  }
});
