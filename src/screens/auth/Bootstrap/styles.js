import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';
import globals from '../../../config/globals';

const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(
      globals.colors.white,
      globals.colors.blackDark,
    ),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
