import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../config/globals';

const styles = new DynamicStyleSheet({
  color: {
    color: new DynamicValue(globals.colors.blackTrue, globals.colors.white),
  },
});

export default styles;
