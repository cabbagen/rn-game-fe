import { StyleSheet } from 'react-native';

import { mainColor } from '../../theme';

export default StyleSheet.create({
  backgroundTop: {
    height: 220,
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: mainColor,
  },
  userInfo: {
    marginTop: 56,
  },
  userInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    position: 'relative',
  },
  userInfoItemImg: {
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 40,
  },
  userInfoItemText: {
    color: '#ffffff',
  },
  userIcon: {
    marginLeft: 8,
    marginTop: -2,
  },
  userExit: {
    position: 'absolute',
    top: 30,
    right: 8,
  },
  userExitText: {
    color: '#ffffff',
  },
  contentBottom: {
    marginTop: 40,
  },
  emptyContentItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyContentItemText: {
    fontSize: 16,
    marginTop: 10,
    color: '#cdcdcd',
  }
});
