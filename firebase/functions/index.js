const functions = require('firebase-functions');
const tools = require('firebase-tools');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');
const fs = require('fs');
const JSZip = require('jszip');
const moment = require('moment');

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
    if (!(context.auth.uid === uid)) {
      throw new functions.https.HttpsError('permission-denied');
    }

    // admin
    //   .auth()
    //   .deleteUser(uid)
    //   .then(() => {
    //     console.log('Successfully deleted user');
    //     return true;
    //   })
    //   .catch(error => {
    //     console.log('Error deleting user:', error);
    //   });

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    return tools.firestore
      .delete(uid, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      })
      .then(() => {
        return {
          path: path,
        };
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

    // generate final zip and save locally
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream('./data.zip'));

    const mailOptions = {
      from: '"Envelope App" <noreply@envelope.app>',
      to: email,
      subject: 'Your data export',
      attachments: [
        {
          filename: 'data.zip',
          path: './data.zip',
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

    // delete temp zip file
    fs.unlink('./data.zip', err => {
      if (err) {
        console.log('failed to delete local zip:' + err);
      }
    });
  });
