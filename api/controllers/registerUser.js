const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const userModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const router = express.Router();
//hashing the password
async function encryptPass(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  console.log(hashedPass);
  return hashedPass;
}
//checks whether the user exists or not.
async function checkUserExistence(email) {
  const query = userModel.where({ "userInfo.email": email });
  let userExists = await userModel.findOne(query);
  let promise = new Promise((response, reject) => {
    if (userExists !== null) {
      reject("The user already exists");
    } else {
      response("No user found with this email");
    }
  });

  return promise;
}
//send OTP to the mail
function sendOTP(email) {
  const OTP = Math.floor(Math.random() * 10000);
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dankparth@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const options = {
    from: "dankparth@gmail.com",
    to: email,
    subject: "OTP verification",
    text: `YOUR OTP FOR VERIFICATION IS ${OTP} (THIS OTP IS ONLY VALID FOR 5 MINUTES)`,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (err, response) {
      if (err) {
        console.log("there was some error while sending the otp : " + err);
        reject(err);
      } else {
        console.log("the otp has been sent!!");
        resolve("the otp has been sent!!");
      }
    });
  });
}
router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;
    console.log(userEmail);
    const profile_pic = req.body.profile_pic || "";
    
    const user_bio = req.body.user_bio || "";
    const encrypted_pass = await encryptPass(password);
    const { v4: uuidv4 } = require("uuid");
    await checkUserExistence(userEmail);
    let random_id = "user#" + uuidv4().toString();
    let data = new userModel({
      id: random_id,
      userInfo: {
        name: userName,
        email: userEmail,
        password: encrypted_pass,
        profile_pic: profile_pic,
        user_bio: user_bio,
      },
      chats: [],
      friends: [],
    });
    await data.save();
    res.status(200).json({
      Message: "The user has been saved!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
