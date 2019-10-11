import { StyleSheet } from 'react-native';

import { mainColor } from '../../theme';

export default StyleSheet.create({
  loginPage: {
    height: '100%',
    backgroundColor: '#fefefe',
  },
  logoWrap: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#cccccc',
  },
  logoText: {
    height: 60,
    lineHeight: 60,
    fontSize: 40,
    color: '#bbbbbb',
    textAlign: 'center',
  },
  form: {
    marginTop: 50,
  },
  formItem: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  formItemInput: {
    borderWidth: 1,
    height: 40,
    borderStyle: 'solid',
    borderColor: '#cccccc',
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  buttonWrap: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 3,
    backgroundColor: mainColor,
  },
  buttonText: {
    height: 50,
    fontSize: 16,
    lineHeight: 50,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
