// import firebase from 'firebase/app';
// import 'firebase/firestore';
import * as firebase from 'firebase';
import config from './config';

// Get a Firestore instance
export default firebase.initializeApp(config);
