// import * as firebase from 'firebase';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {
  FYEB_APIKEY,
  FYEB_AUTHDOMAIN,
  FYEB_PROJECTID,
  FYEB_STORAGEBUCKET,
  FYEB_MESSAGINGSENDERID,
  FYEB_APPID,
  FYEB_MEASURMENTID,
} from '@env';

const firebaseConfig = {
  apiKey: FYEB_APIKEY,
  authDomain: FYEB_AUTHDOMAIN,
  projectId: FYEB_PROJECTID,
  storageBucket: FYEB_STORAGEBUCKET,
  messagingSenderId: FYEB_MESSAGINGSENDERID,
  appId: FYEB_APPID,
  measurementId: FYEB_MEASURMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth();
