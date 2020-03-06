import * as firebase from 'nativescript-plugin-firebase';

const BANNER_IOS = 'ca-app-pub-5831491795997988/7495564994';
const BANNER_ANDROID = 'ca-app-pub-5831491795997988/7970207715';

const CARD_IOS = 'ca-app-pub-5831491795997988/9939802454';
const CARD_ANDROID = 'ca-app-pub-5831491795997988/4527693670';

const KEYWORDS = ['greeting card', 'digital greeting cards', 'anniversary'];

export default class AdService {
  /**
   * Show a banner ad
   */
  async showBanner() {
    return firebase.admob.showBanner({
      testing: TNS_ENV === 'development' ? true : false,
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
    });
  }

  /**
   * Hide a banner ad
   */
  async hideBanner() {
    return firebase.admob.hideBanner();
  }

  /**
   * Preload the Interstitial ad
   */
  async preloadInterstitial() {
    return firebase.admob.preloadInterstitial({
      testing: TNS_ENV === 'development' ? true : false,
      iosInterstitialId: CARD_IOS,
      androidInterstitialId: CARD_ANDROID,
      iosTestDeviceIds: [
        '00008030-001E34282188802E', // Colin's iPhone 11 Pro
        'E5C6BA06-5776-4F6E-BA00-635046A477DE', // Colin's iPhone 11 Pro Simulator
        '143b28fe0be5c36083cd025b338d442ca65ae7da', // Drew's iPhone
        '1EC02EB4-BFCB-426A-B75F-E6EEA69777FC', // Drew's Simulator
      ],
    });
  }

  /**
   * Hide the Interstitial ad
   */
  async showInterstitial() {
    return firebase.admob.showInterstitial().then();
  }
}
