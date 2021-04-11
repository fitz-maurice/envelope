import {Alert, StatusBar, Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/**
 * browser
 *
 * @param url {String} The URL to visit
 */
export const browser = async url => {
  try {
    StatusBar.setBarStyle('light-content');
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'done',
        //   preferredBarTintColor: '#453AA4',
        //   preferredControlTintColor: 'white',
        readerMode: false,
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        //   toolbarColor: '#6200EE',
        //   secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Animations
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
      StatusBar.setBarStyle('dark-content');
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
