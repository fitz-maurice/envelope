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
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    flexDirection: 'column',
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
