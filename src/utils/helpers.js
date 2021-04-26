import {Alert, Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/**
 * browser
 *
 * @param url {String} The URL to visit
 */
export const browser = async url => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        animated: true,
        dismissButtonStyle: 'done',
        preferredControlTintColor: '#590404',
        readerMode: false,
        // modalEnabled: true,
        enableBarCollapsing: true,
        // Android Properties
        showTitle: true,
        secondaryToolbarColor: '#590404',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Android Animations
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
