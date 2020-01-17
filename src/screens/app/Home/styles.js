import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../../config/globals';

const styles = new DynamicStyleSheet({
  header: {
    backgroundColor: new DynamicValue(
      globals.colors.white,
      globals.colors.blackDark,
    ),
  },
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
