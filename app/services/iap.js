import Base from './base';
import * as purchase from '@proplugins/nativescript-purchase';
import {
  Transaction,
  TransactionState,
} from '@proplugins/nativescript-purchase/transaction';
import { setBoolean, setString } from 'tns-core-modules/application-settings';

const PREMIUM_MONTHLY = 'com.fitzcreative.envelope.premium.monthly';
const PREMIUM_ANNUAL = 'com.fitzcreative.envelope.premium.annual';
const UNLIMITED_MONTHLY = 'com.fitzcreative.envelope.unlimited.monthly';
const UNLIMITED_ANNUAL = 'com.fitzcreative.envelope.unlimited.annual';

export default class IAPService extends Base {
  constructor() {
    super();
    this.transaction = null;
  }

  initPurchases() {
    // Watch the purchase state
    purchase.on(purchase.transactionUpdatedEvent, transaction => {
      // Successful Purchase
      if (transaction.transactionState === TransactionState.Purchased) {
        console.log(transaction.transactionDate);
        console.log(transaction.transactionIdentifier);
        setBoolean('isPaying', true);
        setString('product', transaction.productIdentifier);

        // Restored Purchase
      } else if (transaction.transactionState === TransactionState.Restored) {
        alert({
          title: 'Purchase Restored',
          message: `Thank you for using Envelope!`,
          okButtonText: 'Dismiss',
        });
        setBoolean('isPaying', true);
        setString('product', transaction.originalTransaction.productIdentifier);

        // Failed Purchase
      } else if (transaction.transactionState === TransactionState.Failed) {
        alert({
          title: 'Transaction Failed',
          message: `Purchase of ${transaction.productIdentifier} failed!`,
          okButtonText: 'Dismiss',
        });
      }
    });

    // Return available products
    return purchase.init([
      PREMIUM_MONTHLY,
      PREMIUM_ANNUAL,
      UNLIMITED_MONTHLY,
      UNLIMITED_ANNUAL,
    ]);
  }

  async getProducts() {
    return await purchase.getProducts();
  }

  buyProduct(product) {
    // Check if user can make payments
    if (purchase.canMakePayments()) {
      // Buy the product
      purchase.buyProduct(product);
    } else {
      alert({
        title: 'Transaction Failed',
        message: 'Sorry, your account is not eligible to make payments!',
        okButtonText: 'Dismiss',
      });
    }
  }

  async restore() {
    purchase.restorePurchases();
  }
}
