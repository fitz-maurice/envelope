import Base from './base';
import * as purchase from '@proplugins/nativescript-purchase';
import {
  Transaction,
  TransactionState,
} from '@proplugins/nativescript-purchase/transaction';
import * as firebase from 'nativescript-plugin-firebase';
import { setBoolean, setString } from 'tns-core-modules/application-settings';
import {
  getFile,
  getImage,
  getJSON,
  getString,
  request,
  HttpResponse,
} from 'tns-core-modules/http';

const PREMIUM_MONTHLY = 'com.fitzcreative.envelope.premium.monthly';
const PREMIUM_ANNUAL = 'com.fitzcreative.envelope.premium.annual';
const UNLIMITED_MONTHLY = 'com.fitzcreative.envelope.unlimited.monthly';
const UNLIMITED_ANNUAL = 'com.fitzcreative.envelope.unlimited.annual';

export default class IAPService extends Base {
  constructor() {
    super();
    this.transaction = null;
  }

  /**
   * Get available Subscriptions
   */
  async getProducts() {
    return await purchase.getProducts();
  }

  /**
   * Buy a product
   */
  async buyProduct(product) {
    // Check if user can make payments
    if (purchase.canMakePayments()) {
      // Buy the product
      await purchase.buyProduct(product);
    } else {
      alert({
        title: 'Transaction Failed',
        message: 'Sorry, your account is not eligible to make payments!',
        okButtonText: 'Dismiss',
      });
    }
  }

  /**
   * Restore a purchase previously made
   */
  async restore() {
    await purchase.restorePurchases();
  }

  /**
   * Initialize purchases watcher
   */
  initPurchases() {
    // Init our 4 subscriptions
    const purchaseInit = purchase.init([
      PREMIUM_MONTHLY,
      PREMIUM_ANNUAL,
      UNLIMITED_MONTHLY,
      UNLIMITED_ANNUAL,
    ]);

    // Watch the purchase state
    purchase.on(purchase.transactionUpdatedEvent, transaction => {
      // Successful Purchase
      if (transaction.transactionState === TransactionState.Purchased) {
        console.log('---------------------------------------------');
        console.log(transaction);
        console.log('---------------------------------------------');
        request({
          url:
            'https://us-central1-theenvelopeapp.cloudfunctions.net/verifyReceipt',
          method: 'POST',
          content: JSON.stringify({
            receipt: transaction.transactionReceipt,
          }),
        }).then(
          response => {
            console.log('---------------------------------------------');
            console.log(response.content.toJSON());
            console.log('---------------------------------------------');
            firebase.firestore
              .collection(`${this.uid}`)
              .doc('account')
              .update({
                iap: {
                  product: 'com.fitzcreative.envelope.premium.monthly',
                  originalTransactionId: 1000000634907220,
                  startDate: new Date(1583477303000),
                  endDate: new Date(1583477603000),
                  latestReceipt:
                    'ewoJInNpZ25hdHVyZSIgPSAiQXdpTHA2cHI5OEtTRjZCQmFtR21hNnREVG4xNWJVOVJIY2REYkZvdVdYUy9EaGFEa294dEVxdS9taDUveG5kK2c3bmJXR0dGeGUwRDNaTFMyR29BRGJqSndpVFVRYW5XZURUNU40NU56Y0hheHZMRFRhWFNyaVpMdk5QT0p0VXVuSkxodndSVytoTGU5eEZrTlA3MEVVM2U2SjRZK1NjRnNkQy9idUFnMU5BVm1IREMzb2t5a1gvY0dFNENLOEsxZFg5aEhGK1FlZGZ1WEpyazZqQ3YxUUpXb0x1bFc5Y1p2VUV0ZGNwYTJ4bnJZNEtHNnZYWWw4Sm1sU3V1VXpHTTJoTXZ5MVJIZUFWbk15YWlGUWFwZER1VmJFNVlUOEk2WUdEZ3A4V0xmTWQwSkRzOXFyYVI2OU9FUFF2OEFESytISUFiaEZxekFLbVBRYzAzbVE3R3lSMEFBQVdBTUlJRmZEQ0NCR1NnQXdJQkFnSUlEdXRYaCtlZUNZMHdEUVlKS29aSWh2Y05BUUVGQlFBd2daWXhDekFKQmdOVkJBWVRBbFZUTVJNd0VRWURWUVFLREFwQmNIQnNaU0JKYm1NdU1Td3dLZ1lEVlFRTERDTkJjSEJzWlNCWGIzSnNaSGRwWkdVZ1JHVjJaV3h2Y0dWeUlGSmxiR0YwYVc5dWN6RkVNRUlHQTFVRUF3dzdRWEJ3YkdVZ1YyOXliR1IzYVdSbElFUmxkbVZzYjNCbGNpQlNaV3hoZEdsdmJuTWdRMlZ5ZEdsbWFXTmhkR2x2YmlCQmRYUm9iM0pwZEhrd0hoY05NVFV4TVRFek1ESXhOVEE1V2hjTk1qTXdNakEzTWpFME9EUTNXakNCaVRFM01EVUdBMVVFQXd3dVRXRmpJRUZ3Y0NCVGRHOXlaU0JoYm1RZ2FWUjFibVZ6SUZOMGIzSmxJRkpsWTJWcGNIUWdVMmxuYm1sdVp6RXNNQ29HQTFVRUN3d2pRWEJ3YkdVZ1YyOXliR1IzYVdSbElFUmxkbVZzYjNCbGNpQlNaV3hoZEdsdmJuTXhFekFSQmdOVkJBb01Da0Z3Y0d4bElFbHVZeTR4Q3pBSkJnTlZCQVlUQWxWVE1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBcGMrQi9TV2lnVnZXaCswajJqTWNqdUlqd0tYRUpzczl4cC9zU2cxVmh2K2tBdGVYeWpsVWJYMS9zbFFZbmNRc1VuR09aSHVDem9tNlNkWUk1YlNJY2M4L1cwWXV4c1FkdUFPcFdLSUVQaUY0MWR1MzBJNFNqWU5NV3lwb041UEM4cjBleE5LaERFcFlVcXNTNCszZEg1Z1ZrRFV0d3N3U3lvMUlnZmRZZUZScjZJd3hOaDlLQmd4SFZQTTNrTGl5a29sOVg2U0ZTdUhBbk9DNnBMdUNsMlAwSzVQQi9UNXZ5c0gxUEttUFVockFKUXAyRHQ3K21mNy93bXYxVzE2c2MxRkpDRmFKekVPUXpJNkJBdENnbDdaY3NhRnBhWWVRRUdnbUpqbTRIUkJ6c0FwZHhYUFEzM1k3MkMzWmlCN2o3QWZQNG83UTAvb21WWUh2NGdOSkl3SURBUUFCbzRJQjF6Q0NBZE13UHdZSUt3WUJCUVVIQVFFRU16QXhNQzhHQ0NzR0FRVUZCekFCaGlOb2RIUndPaTh2YjJOemNDNWhjSEJzWlM1amIyMHZiMk56Y0RBekxYZDNaSEl3TkRBZEJnTlZIUTRFRmdRVWthU2MvTVIydDUrZ2l2Uk45WTgyWGUwckJJVXdEQVlEVlIwVEFRSC9CQUl3QURBZkJnTlZIU01FR0RBV2dCU0lKeGNKcWJZWVlJdnM2N3IyUjFuRlVsU2p0ekNDQVI0R0ExVWRJQVNDQVJVd2dnRVJNSUlCRFFZS0tvWklodmRqWkFVR0FUQ0IvakNCd3dZSUt3WUJCUVVIQWdJd2diWU1nYk5TWld4cFlXNWpaU0J2YmlCMGFHbHpJR05sY25ScFptbGpZWFJsSUdKNUlHRnVlU0J3WVhKMGVTQmhjM04xYldWeklHRmpZMlZ3ZEdGdVkyVWdiMllnZEdobElIUm9aVzRnWVhCd2JHbGpZV0pzWlNCemRHRnVaR0Z5WkNCMFpYSnRjeUJoYm1RZ1kyOXVaR2wwYVc5dWN5QnZaaUIxYzJVc0lHTmxjblJwWm1sallYUmxJSEJ2YkdsamVTQmhibVFnWTJWeWRHbG1hV05oZEdsdmJpQndjbUZqZEdsalpTQnpkR0YwWlcxbGJuUnpMakEyQmdnckJnRUZCUWNDQVJZcWFIUjBjRG92TDNkM2R5NWhjSEJzWlM1amIyMHZZMlZ5ZEdsbWFXTmhkR1ZoZFhSb2IzSnBkSGt2TUE0R0ExVWREd0VCL3dRRUF3SUhnREFRQmdvcWhraUc5Mk5rQmdzQkJBSUZBREFOQmdrcWhraUc5dzBCQVFVRkFBT0NBUUVBRGFZYjB5NDk0MXNyQjI1Q2xtelQ2SXhETUlKZjRGelJqYjY5RDcwYS9DV1MyNHlGdzRCWjMrUGkxeTRGRkt3TjI3YTQvdncxTG56THJSZHJqbjhmNUhlNXNXZVZ0Qk5lcGhtR2R2aGFJSlhuWTR3UGMvem83Y1lmcnBuNFpVaGNvT0FvT3NBUU55MjVvQVE1SDNPNXlBWDk4dDUvR2lvcWJpc0IvS0FnWE5ucmZTZW1NL2oxbU9DK1JOdXhUR2Y4YmdwUHllSUdxTktYODZlT2ExR2lXb1IxWmRFV0JHTGp3Vi8xQ0tuUGFObVNBTW5CakxQNGpRQmt1bGhnd0h5dmozWEthYmxiS3RZZGFHNllRdlZNcHpjWm04dzdISG9aUS9PamJiOUlZQVlNTnBJcjdONFl0UkhhTFNQUWp2eWdhWndYRzU2QWV6bEhSVEJoTDhjVHFBPT0iOwoJInB1cmNoYXNlLWluZm8iID0gImV3b0pJbTl5YVdkcGJtRnNMWEIxY21Ob1lYTmxMV1JoZEdVdGNITjBJaUE5SUNJeU1ESXdMVEF6TFRBMElERTFPakkyT2pVeElFRnRaWEpwWTJFdlRHOXpYMEZ1WjJWc1pYTWlPd29KSW5GMVlXNTBhWFI1SWlBOUlDSXhJanNLQ1NKemRXSnpZM0pwY0hScGIyNHRaM0p2ZFhBdGFXUmxiblJwWm1sbGNpSWdQU0FpTWpBMU9UTTNPRElpT3dvSkluVnVhWEYxWlMxMlpXNWtiM0l0YVdSbGJuUnBabWxsY2lJZ1BTQWlSREk0TXpNM1JqUXRRVE5DUXkwME9UTXdMVGxGTVRBdFJFUkRNemN3TnpkR01ESTJJanNLQ1NKdmNtbG5hVzVoYkMxd2RYSmphR0Z6WlMxa1lYUmxMVzF6SWlBOUlDSXhOVGd6TXpZME5ERXhNREF3SWpzS0NTSmxlSEJwY21WekxXUmhkR1V0Wm05eWJXRjBkR1ZrSWlBOUlDSXlNREl3TFRBekxURXhJREEyT2pBMU9qVTJJRVYwWXk5SFRWUWlPd29KSW1sekxXbHVMV2x1ZEhKdkxXOW1abVZ5TFhCbGNtbHZaQ0lnUFNBaVptRnNjMlVpT3dvSkluQjFjbU5vWVhObExXUmhkR1V0YlhNaUlEMGdJakUxT0RNNU1ETXhOVFl3TURBaU93b0pJbVY0Y0dseVpYTXRaR0YwWlMxbWIzSnRZWFIwWldRdGNITjBJaUE5SUNJeU1ESXdMVEF6TFRFd0lESXpPakExT2pVMklFRnRaWEpwWTJFdlRHOXpYMEZ1WjJWc1pYTWlPd29KSW1sekxYUnlhV0ZzTFhCbGNtbHZaQ0lnUFNBaVptRnNjMlVpT3dvSkltbDBaVzB0YVdRaUlEMGdJakUwT1Rjd016QTFNRFlpT3dvSkluVnVhWEYxWlMxcFpHVnVkR2xtYVdWeUlpQTlJQ0l3TURBd09EQXpNQzB3TURGRk16UXlPREl4T0RnNE1ESkZJanNLQ1NKdmNtbG5hVzVoYkMxMGNtRnVjMkZqZEdsdmJpMXBaQ0lnUFNBaU1UQXdNREF3TURZek5Ea3dOekl5TUNJN0Nna2laWGh3YVhKbGN5MWtZWFJsSWlBOUlDSXhOVGd6T1RBMk56VTJNREF3SWpzS0NTSjBjbUZ1YzJGamRHbHZiaTFwWkNJZ1BTQWlNVEF3TURBd01EWXpOelEzT0RVMU55STdDZ2tpWW5aeWN5SWdQU0FpTWlJN0Nna2lkMlZpTFc5eVpHVnlMV3hwYm1VdGFYUmxiUzFwWkNJZ1BTQWlNVEF3TURBd01EQTFNRGcwTnpNek5DSTdDZ2tpWW1sa0lpQTlJQ0pqYjIwdVptbDBlbU55WldGMGFYWmxMbVZ1ZG1Wc2IzQmxJanNLQ1NKd2NtOWtkV04wTFdsa0lpQTlJQ0pqYjIwdVptbDBlbU55WldGMGFYWmxMbVZ1ZG1Wc2IzQmxMbkJ5WlcxcGRXMHVZVzV1ZFdGc0lqc0tDU0p3ZFhKamFHRnpaUzFrWVhSbElpQTlJQ0l5TURJd0xUQXpMVEV4SURBMU9qQTFPalUySUVWMFl5OUhUVlFpT3dvSkluQjFjbU5vWVhObExXUmhkR1V0Y0hOMElpQTlJQ0l5TURJd0xUQXpMVEV3SURJeU9qQTFPalUySUVGdFpYSnBZMkV2VEc5elgwRnVaMlZzWlhNaU93b0pJbTl5YVdkcGJtRnNMWEIxY21Ob1lYTmxMV1JoZEdVaUlEMGdJakl3TWpBdE1ETXRNRFFnTWpNNk1qWTZOVEVnUlhSakwwZE5WQ0k3Q24wPSI7CgkiZW52aXJvbm1lbnQiID0gIlNhbmRib3giOwoJInBvZCIgPSAiMTAwIjsKCSJzaWduaW5nLXN0YXR1cyIgPSAiMCI7Cn0=',
                },
              });
          },
          e => {},
        );

        // Restored Purchase
      } else if (transaction.transactionState === TransactionState.Restored) {
        alert({
          title: 'Purchase Restored',
          message: `Thank you for using Envelope!`,
          okButtonText: 'Dismiss',
        });

        // Failed Purchase
      } else if (transaction.transactionState === TransactionState.Failed) {
        console.log(`Purchase of ${transaction.productIdentifier} failed!`);
        // alert({
        //   title: 'Transaction Failed',
        //   message: `Purchase of ${transaction.productIdentifier} failed!`,
        //   okButtonText: 'Dismiss',
        // });
      }
    });

    // Return promise
    return purchaseInit;
  }
}
