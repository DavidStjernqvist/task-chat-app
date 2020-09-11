const express = require("express");
const router = express.Router();

const fireBaseAdmin = require("../config/firebase");
const { json } = require("express");

let defaultAuth = fireBaseAdmin.auth();

const allUsers = [];

// (async function getAllUsers(){
  // const users = [];
  // await defaultAuth.listUsers(1000)
  //   .then((listUsersResult) => {
  //     listUsersResult.users.forEach((userRecord) => {
  //       if (!users.includes(userRecord.email))
  //         users.push(userRecord);
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log('Error listing users:', error);
  //   })

//     users.forEach((user) => 
//       allUsers.push({
//         uid: user.uid,
//         email: user.email,
//         isLoggedIn: false,
//         imgUrl: 'https://style.anu.edu.au/_anu/4/images/placeholders/person.png', 
//       })
//       )
//   })();

router.get('/', async (req, res) => {
  res.send({ response: "I am alive" }).status(200);
})

router.get('/api/users', async (req, res) => {
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
});

module.exports = router;