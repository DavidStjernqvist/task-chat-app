const admin = require("firebase-admin")
const express = require("express");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://task-chat-app.firebaseio.com"
  });

