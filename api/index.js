const express = require("express");
const RegisterUser = require("./controllers/registerUser.js");
const LoginUser = require("./controllers/loginUser.js");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use("/register",RegisterUser);
app.use("/login",LoginUser);
mongoose
  .connect(
    "mongodb+srv://Parth_sharma:iostream2311@cluster0.syfilge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(2003, () => console.log("listening on port 2003"));
