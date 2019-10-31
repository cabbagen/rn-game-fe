import { StyleSheet } from 'react-native';
import { mainColor } from '../../theme';

export default StyleSheet.create({
  gamePlayItem: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  gamePlayItemInfo: {
    marginLeft: 10,
    paddingVertical: 3,
    display: 'flex',
    flex: 1,
    justifyContent:'space-between',
  },
  gamePlayItemPlayWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  gamePlayItemPlayLine: {
    height: 25,
    lineHeight: 25,
  },
  gamePlayItemPlayBtn: {
    width: 60,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: mainColor,
  },
});
