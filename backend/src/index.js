const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send({respone: "I am alive"}).status(200);
  })
  
module.exports = router;