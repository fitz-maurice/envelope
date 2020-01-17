import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../config/globals';

const styles = new DynamicStyleSheet({
  header: {
    backgroundColor: new DynamicValue(
      globals.colors.white,
      globals.colors.blackDark,
    ),
  },
  left: {
    marginLeft: 5,
  },
  headerTitle: {
    color: new DynamicValue(globals.colors.blackTrue, globals.colors.white),
  },
  iconColor: {
    color: new DynamicValue(globals.colors.blackTrue, globals.colors.white),
  },
  rightLayout: {
    flexDirection: 'row',
  },
  searchLayout: {
    marginLeft: 4,
  },
  iconColorSearch: {
    marginTop: 2,
    marginLeft: 6,
    color: globals.colors.blackTrue,
  },
  searchCancel: {
    color: new DynamicValue(globals.colors.blackTrue, globals.colors.white),
  },
});

export default styles;
