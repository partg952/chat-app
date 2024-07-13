const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = express.Router();
const userModel = require("../models/User.js");
router.post("/", async function (req, res) {
  const { email, password } = req.body;
  const query = userModel.where({ "userInfo.email": email });
  const user = await userModel.findOne(query);
  console.log(user);
  if (user !== null) {
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(password, salt);
    console.log(hashedPass);
    console.log(user.userInfo.password);
    bcrypt.compare(password, user.userInfo.password, (err, data) => {
      console.log(data);
      if (err) {
        res.send(err);
      } else if (data) {
        res.json({
          Message: "Login success",
        });
      } else {
        res.json({
          Message: "Invalid password",
        });
      }
    });
  } else {
    res.json({
      Message: "No user found",
    });
  }
});

module.exports = router;
