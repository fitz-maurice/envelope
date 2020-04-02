const serviceAccount = require('./admin.json');
const axios = require('axios');
const JSZip = require('jszip');
const moment = require('moment');
const admin = require('firebase-admin');
const tools = require('firebase-tools');
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://theenvelopeapp.firebaseio.com',
});

const email = functions.config().email.email;
const password = functions.config().email.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
});

/**
 * Delete all of user's data
 * @param {string} data.path the document or collection path to delete.
 */
exports.deleteAccount = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(({ uid }, context) => {
    // Only allow users to delete their own data
    if (context.auth.uid !== uid) {
      throw new functions.https.HttpsError('permission-denied');
    }

    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log('Successfully deleted user');
        return true;
      })
      .catch(error => {
        console.log('Error deleting user:', error);
      });

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    return tools.firestore.delete(uid, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });
  });

/**
 * Export user's data
 * @param {string} uid
 * @param {string} email
 */
exports.exportUserData = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async ({ uid, email }, context) => {
    // Fetch the user's cards
    const cardsRef = await admin
      .firestore()
      .collection(`${uid}/account/cards`)
      .get();

    // create new zip instance
    const zip = new JSZip();

    // Loop through cards and add to zip
    cardsRef.docs.forEach(card => {
      const images = [];
      temp = card.data();
      images.push(temp.images);
      delete temp.images;

      // create folder for card
      const folder = zip.folder(
        `cards/${temp.from}-${temp.tag}-${temp.date.replace(/\//gi, '_')}`,
      );

      // create text fields for .txt file
      const final = [];
      Object.entries(temp).forEach(([key, value]) => {
        if (key === 'createdAt' || key === 'updatedAt') {
          final.push(`${key}: ${moment(value).format('MM/DD/YYYY')} \r\n`);
        } else {
          final.push(`${key === 'tag' ? 'occassion' : key}: ${value} \r\n`);
        }
      });

      // add text fields to file in zip
      folder.file('data.txt', final.join(''));

      // Loop through images and add to zip
      Object.values(images).forEach(object => {
        Object.values(object).forEach((image, index) => {
          folder.file(`${index + 1}.jpg`, image, {
            base64: true,
          });
        });
      });
    });

    // create zip attachment
    const attachment = zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true,
    });

    const mailOptions = {
      from: '"Envelope App" <noreply@envelope.app>',
      to: email,
      subject: 'Your data export',
      attachments: [
        {
          filename: 'data.zip',
          content: attachment,
        },
      ],
      text:
        'Attached is your data export. If you have any issues with the data please contact admin@envelope.app',
    };

    try {
      await mailTransport.sendMail(mailOptions);
    } catch (error) {
      console.error('There was an error while sending the email:', error);
    }
  });

/**
 * Verify a receipt from Apple
 * @param {object} req - The Base64 encoded receipt
 */
exports.verifyReceipt = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onRequest(async (req, res) => {
    const body = {
      'receipt-data': req.body.receipt,
      'exclude-old-transactions': true,
      password: '219aba5a7a5045b38c6505dc026c9f48',
    };

    const prod = await axios
      .post('https://buy.itunes.apple.com/verifyReceipt', body)
      .then(productionResponse => productionResponse.data)
      .catch(error => console.log(error));

    if (prod.status === 21007) {
      const sandbox = await axios
        .post('https://sandbox.itunes.apple.com/verifyReceipt', body)
        .then(sandboxResponse => sandboxResponse.data);

      res.send(sandbox);
      return;
    }

    res.send(prod);
    return;
  });

/**
 * Accept Apple App Store Server Notifications
 * @param {object} payload
 */
exports.appStoreServerNotifications = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onRequest(async (req, res) => {
    // try {
    //   await mailTransport.sendMail({
    //     from: '"Envelope App" <noreply@envelope.app>',
    //     to: 'colin@fitz-maurice.com',
    //     subject: 'Post from Apple...',
    //     text: req.rawBody,
    //   });
    // } catch (error) {
    //   console.error('There was an error while sending the email:', error);
    // }

    const userId = await admin
      .firestore()
      .collection('purchases')
      .doc('1000000634907220')
      .get()
      .then(doc => doc.data());

    // Alert new purchase!
    if (req.body.notification_type === 'INITIAL_BUY') {
      axios.post(
        'https://hooks.slack.com/services/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',
        {
          text: `Envelope Purchase!\n\n*Product:* ${req.body.auto_renew_product_id}`,
        },
      );
    }

    // Update the user data
    if (
      ['RENEWAL', 'INTERACTIVE_RENEWAL', 'CANCEL'].includes(
        req.body.notification_type,
      )
    ) {
      console.log(req.body.unified_receipt.latest_receipt);
      await admin
        .firestore()
        .collection(`${userId.user}`)
        .doc('account')
        .update({
          iap: {
            product: req.body.auto_renew_product_id,
            originalTransactionId:
              req.body.unified_receipt.pending_renewal_info[0]
                .original_transaction_id,
            startDate: req.body.unified_receipt.latest_receipt_info[0].purchase_date.slice(
              0,
              -8,
            ),
            endDate: req.body.unified_receipt.latest_receipt_info[0].expires_date.slice(
              0,
              -8,
            ),
            latestReceipt: req.body.unified_receipt.latest_receipt,
          },
        });
    }

    res.send('Okay');
    return;
  });

/**
 * Trigger every time a person signs up
 * @param {object} payload
 */
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  axios.post(
    'https://hooks.slack.com/services/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',
    {
      text: `New user sign up!\n\n*Email:* ${user.email}`,
    },
  );
});
