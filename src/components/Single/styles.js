import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../config/globals';

const styles = new DynamicStyleSheet({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: globals.window.width,
    height: globals.window.height,
    zIndex: 9,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 60,
    height: 60,
  },
  square: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default styles;
