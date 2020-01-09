import {Platform} from 'react-native';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';
import globals from '../../../config/globals';

const styles = new DynamicStyleSheet({
  background: {
    backgroundColor: new DynamicValue(
      globals.colors.white,
      globals.colors.blackDark,
    ),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    shadowRadius: Platform.OS === 'iOS' ? 9 : 0,
    ...(Platform.OS === 'iOS' ? globals.shadow : null),
    marginTop: globals.window.height * 0.25 - 75,
    marginBottom: globals.window.height * 0.25 - 75,
  },
  footer: {
    paddingHorizontal: 15,
    borderTopColor: new DynamicValue(
      globals.colors.white,
      globals.colors.blackDark,
    ),
    // ...globals.blockSpaceBetween,
  },
  footerText: {
    textAlign: 'center',
  },
});

export default styles;
