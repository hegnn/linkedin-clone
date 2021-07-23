// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDGa_W-xlU8d5ag70u9VHysfSK0KwWZGFE",
  authDomain: "hegonen-linkedin.firebaseapp.com",
  projectId: "hegonen-linkedin",
  storageBucket: "hegonen-linkedin.appspot.com",
  messagingSenderId: "592755641414",
  appId: "1:592755641414:web:8c86b7bdf2cbc937c40e47",
  measurementId: "G-J9QDL3091D"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export { db, auth }