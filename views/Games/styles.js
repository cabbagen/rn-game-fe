import { StyleSheet } from 'react-native';
import { mainColor } from '../../theme';

export default StyleSheet.create({
  gamesBanner: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#353535',
  },
  gamesBannerText: {
    fontSize: 28,
    color: '#ffffff',
    marginTop: 50
  },
  gamesPlayedWrap: {
    paddingHorizontal: 8,
  },
  gamesPlayedTitle: {
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    color: mainColor,
  }
});
