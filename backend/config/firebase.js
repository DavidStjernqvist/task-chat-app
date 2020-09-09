const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyAZLllU2btMbCk2I1fPZ6WYL3SbZNVXGA4",
    authDomain: "task-chat-app.firebaseapp.com",
    databaseURL: "https://task-chat-app.firebaseio.com",
    projectId: "task-chat-app",
    storageBucket: "task-chat-app.appspot.com",
    messagingSenderId: "960810357696",
    appId: "1:960810357696:web:6ec492d6f2cf40ea0b2e25",
    measurementId: "G-7QTNGCD09X",
  };

  firebase.initializeApp(firebaseConfig);

  module.exports = firebase;