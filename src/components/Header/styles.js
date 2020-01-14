import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../config/globals';

const styles = new DynamicStyleSheet({
  header: {
    backgroundColor: globals.colors.envelopeRed,
  },
  headerTitle: {
    color: globals.colors.white,
  },
  iconColor: {
    color: globals.colors.white,
  },
  iconColorSearch: {
    marginTop: 2,
    marginLeft: 6,
    color: globals.colors.blackTrue,
  },
  leftLayout: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  searchLayout: {
    marginLeft: 4,
  },
});

export default styles;
