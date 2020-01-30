import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

const BANNER_IOS = 'ca-app-pub-5831491795997988/7495564994';
const BANNER_ANDROID = 'ca-app-pub-5831491795997988/7970207715';

const KEYWORDS = ['greeting card', 'digital greeting cards', 'anniversary'];

export default class AdService extends Base {
  async showBanner() {
    firebase.admob
      .showBanner({
        // when not running in production set this to true, Google doesn't like it any other way
        testing: true,
        keywords: KEYWORDS,
        iosBannerId: BANNER_IOS,
        androidBannerId: BANNER_ANDROID,
        size: firebase.admob.AD_SIZE.SMART_BANNER,
        margins: { bottom: 10 },
        iosTestDeviceIds: [
          '00008030-001E34282188802E', // Colin's iPhone 11 Pro
          'E5C6BA06-5776-4F6E-BA00-635046A477DE', // Colin's iPhone 11 Pro Simulator
          '143b28fe0be5c36083cd025b338d442ca65ae7da', // Drew's iPhone
          '1EC02EB4-BFCB-426A-B75F-E6EEA69777FC', // Drew's Simulator
        ],
        onOpened: () => console.log('>> Ad opened'),
        onClicked: () => console.log('>> Ad clicked'),
        onLeftApplication: () => console.log('>> Ad left application'),
      })
      .then(
        () => {
          console.log('>> AdMob banner showing!');
        },
        errorMessage => {
          dialogs.alert({
            title: 'AdMob error',
            message: errorMessage,
            okButtonText: 'Hmmkay',
          });
        },
      );
  }

  async hideBanner() {
    firebase.admob.hideBanner();
  }
}
