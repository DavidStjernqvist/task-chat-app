let admin = require("firebase-admin");

let serviceAccount = require("../chat-app-b133a-firebase-adminsdk-c05li-8703e36215.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-app-b133a.firebaseio.com"
});

module.exports = admin;