import { StyleSheet } from 'react-native';
import { mainColor } from '../../theme'

export default StyleSheet.create({
  categoryNav: {
    width: '100%',
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 24,
    backgroundColor: '#ffffff',
  },
  categoryNavItem: {
    width: 100,
    height: 45,
    lineHeight: 45,
    textAlign: 'center',
  },
  selectedCategoryNavItem: {
    width: 100,
    height: 45,
    lineHeight: 45,
    borderBottomWidth: 2,
    borderColor: mainColor,
    borderStyle: 'solid',
  },
  categoryGames: {
    marginTop: 80,
    paddingHorizontal: 8,
  }
});
