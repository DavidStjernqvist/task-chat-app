import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDtBxXCHu6FQSp4Sf4IesMuDcqU1u2s6jU",
    authDomain: "chat-app-b133a.firebaseapp.com",
    databaseURL: "https://chat-app-b133a.firebaseio.com",
    projectId: "chat-app-b133a",
    storageBucket: "chat-app-b133a.appspot.com",
    messagingSenderId: "1088136198976",
    appId: "1:1088136198976:web:78b411efdfa7035985d8a5"
  };
  
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;