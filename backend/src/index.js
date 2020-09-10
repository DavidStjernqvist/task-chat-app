const express = require("express");
const router = express.Router();

const fireBaseAdmin = require("../config/firebase");
let defaultAuth = fireBaseAdmin.auth();

router.get('/', (req, res) => {
  res.send({ response: "I am alive" }).status(200);
})

router.get('/api/users', async(req, res) => {
  const users = [];
  await defaultAuth.listUsers(1000)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        if (!users.includes(userRecord.email))
          users.push(userRecord);
      });
    })
    .catch(function (error) {
      console.log('Error listing users:', error);
    })
    res.send(users);
})


module.exports = router;