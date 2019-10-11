import { StyleSheet } from 'react-native';
import { mainColor } from '../../theme';

export default StyleSheet.create({
  gameDetailPage: {
    paddingHorizontal: 8,
  },
  gameDetailTop: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  gameDetailTopInfo: {
    marginLeft: 10,
    paddingVertical: 3,
    display: 'flex',
    flex: 1,
    justifyContent:'space-between',
  },
  gameDetailPlayWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  gameDetailPlayLine: {
    height: 25,
    lineHeight: 25,
  },
  gameDetailPlayBtn: {
    width: 60,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: mainColor,
  },
  gameDetailDescriptionTitle: {
    height: 45,
    lineHeight: 45,
  }
});
