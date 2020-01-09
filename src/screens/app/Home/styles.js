import { StyleSheet } from 'react-native';
import globals from '../../../config/globals';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // height: globals.window.height,
  },
  logo: {
    marginVertical: 60,
  },
  signUpButton: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'black',
    paddingVertical: 5,
  },
  signUpButtonText: {
    color: 'white',
  },
});

export default styles;
