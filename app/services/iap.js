import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';
import * as purchase from '@proplugins/nativescript-purchase';
import { request, HttpResponse } from 'tns-core-modules/http';
import { TransactionState } from '@proplugins/nativescript-purchase/transaction';

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
        request({
          url:
            'https://us-central1-theenvelopeapp.cloudfunctions.net/verifyReceipt',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          content: JSON.stringify({
            receipt: transaction.transactionReceipt,
          }),
        }).then(
          response => {
            const result = response.content.toJSON();
            firebase.firestore
              .collection(`${this.uid}`)
              .doc('account')
              .update({
                iap: {
                  product: result.auto_renew_product_id,
                  originalTransactionId: result.receipt.original_transaction_id,
                  startDate: result.receipt.purchase_date.slice(0, -8),
                  endDate: result.receipt.expires_date_formatted.slice(0, -8),
                  latestReceipt: result.latest_receipt,
                },
              });
          },
          e => {
            console.log(error);
          },
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
      }
    });

    // Return promise
    return purchaseInit;
  }
}
