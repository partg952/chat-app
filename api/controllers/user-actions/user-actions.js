const mongoose = require("mongoose");
const userModel = require("../../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  let users = await userModel.find();
  res.send(users);
});
router.post("/send-request", async function (req, res) {
  try {
    const userUid = req.body.userUid;
    const friendUid = req.body.friendUid;
    console.log(friendUid + userUid);
    const updatedUser = await userModel.updateOne(
      { id: friendUid },
      {
        $push: {
          requests: userUid,
        },
      }
    );
    console.log("in send request block");
    console.log(updatedUser);
    res.json({
      Message: updatedUser,
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
});
router.post("/accept-requests", async function (req, res) {
  try {
    let userId = req.body.userId;
    let friendId = req.body.friendId;
    await userModel.updateOne(
      { id: userId },
      {
        $pull: {
          requests: friendId,
        },
      }
    );
    await userModel.updateOne(
      { id: userId },
      {
        $push: {
          friends: friendId,
        },
      }
    );
    await userModel.updateOne(
      { id: friendId },
      {
        $push: {
          friends: userId,
        },
      }
    );

    res.json({
      Message: "The Request has been accepted",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
});
router.post("/reject-requests",async function(req,res) {
  try {
    let userId = req.body.userId;
    let friendId = req.body.friendId;
    await userModel.updateOne({"id" : userId} , {
      $pull : {
        requests : friendId
      }  
    });
    res.json({
      Message:"Request Rejected"
    })
  }
  catch(err) {
    res.json({
      Message:err
    })
  }
  
})
router.post("/get-user-info", async function (req, res) {
  let userId = req.body.userId;
  const data = await userModel.findOne({ id: userId });
  res.send(data);
});
router.post("/get-requests", async function (req, res) {
  const reqArray = [];
  const userId = req.body.userId;
  const userData = await userModel.findOne({ id: userId });
  console.log(userData);
  res.send(userData.requests);
});
router.post("/get-friends", async function (req, res) {
  let userId = req.body.userId;
  let friends = await userModel.findOne({ id: userId }).then((res) => res.friends);
  console.log(friends);
  res.send(friends);
});
module.exports = router;
