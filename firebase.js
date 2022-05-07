// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'igclone-2de98.firebaseapp.com',
  projectId: 'igclone-2de98',
  storageBucket: 'igclone-2de98.appspot.com',
  messagingSenderId: '331497761810',
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const fireStoreDB = getFirestore()
const firebaseStorage = getStorage()

export { app, fireStoreDB, firebaseStorage }
