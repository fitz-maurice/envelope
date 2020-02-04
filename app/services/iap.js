import Base from './base';
import * as purchase from '@proplugins/nativescript-purchase';
import {
  Transaction,
  TransactionState,
} from '@proplugins/nativescript-purchase/transaction';

const PREMIUM_MONTHLY = 'com.fitzcreative.envelope.premium.monthly';
const PREMIUM_ANNUAL = 'com.fitzcreative.envelope.premium.annual';

export default class IAPService extends Base {
  constructor() {
    super();
    this.products = null;
    this.transaction = null;
  }

  async initPurchases() {
    this.transaction = purchase
      .init([PREMIUM_MONTHLY, PREMIUM_ANNUAL])
      .then(() => {
        purchase.getProducts().then(products => {
          this.products = products;
          products.forEach(product => {
            console.log('-----------------------------------------');
            console.log(product.productIdentifier);
            console.log(product.localizedTitle);
            console.log(product.priceFormatted);
            console.log('-----------------------------------------');
          });
        });
      });

    purchase.on(purchase.transactionUpdatedEvent, transaction => {
      if (transaction.transactionState === TransactionState.Purchased) {
        alert(
          `Congratulations you just bought ${transaction.productIdentifier}!`,
        );
        console.log(transaction.transactionDate);
        console.log(transaction.transactionIdentifier);

        // TODO - Set a flag on the user...
        // applicationSettings.setBoolean(transaction.productIdentifier, true);
      } else if (transaction.transactionState === TransactionState.Restored) {
        console.log(
          `Purchase of ${transaction.originalTransaction.productIdentifier} restored.`,
        );
        console.log(transaction.originalTransaction);
        console.log(transaction.originalTransaction.transactionDate);

        // TODO - Set a flag on the user...
        // applicationSettings.setBoolean(
        //   transaction.originalTransaction.productIdentifier,
        //   true,
        // );
      } else if (transaction.transactionState === TransactionState.Failed) {
        alert(`Purchase of ${transaction.productIdentifier} failed!`);
      }
    });
  }

  async restore() {
    purchase.restorePurchases().then(
      () => console.log('>>> RESTORING'),
      () => console.log('Cancelling....'),
    );
  }
}
