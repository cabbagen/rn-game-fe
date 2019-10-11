import { StyleSheet } from 'react-native';
import { mainColor } from '../../theme';

export default StyleSheet.create({
  searchWrap: {
    height: 45,
    width: '100%',
    position: 'absolute',
    top: 24,
    backgroundColor: '#ffffff'
  },
  searchGames: {
    marginTop: 80,
    paddingHorizontal: 8,
  },
  searchEmptyWrap: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchEmptyText: {
    color: '#cccccc',
  }
});
