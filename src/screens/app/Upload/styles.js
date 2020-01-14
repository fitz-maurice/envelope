import { Platform } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import globals from '../../../config/globals';

const styles = new DynamicStyleSheet({
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
  // New under here...
  cropper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  uploadImageBlock: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: globals.colors.gray[300],
    borderRadius: 5,
    height: 200,
  },
});

export default styles;
