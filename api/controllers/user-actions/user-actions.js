const mongoose = require("mongoose");
const userModel = require("../../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/",async function(req,res) {
  let users = await userModel.find();
  res.send(users);

})
router.post("/send-request",async function(req,res) {
  try {
    const userUid = req.body.userUid;
    const friendUid = req.body.friendUid;
    const updatedUser = await userModel.update({uid:friendUid},{
      $push:{
        "requests":userUid
      } 
    })
    res.json({
      "Message" : "Request success"
    })
  }
  catch(err) {
    res.json({
      "Message":err
    })
  }
});

module.exports = router;


