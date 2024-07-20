const express = require("express");
require("dotenv").config();
console.log(process.env.MONGODB_URL);
const RegisterUser = require("./controllers/auth/registerUser.js");
const http = require("http");
const cors = require("cors");
const LoginUser = require("./controllers/auth/loginUser.js");
const searchUser = require("./controllers/user-actions/user-actions.js");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:"10mb"}));
app.use(cors());
app.use("/register", RegisterUser);
app.use("/login", LoginUser);
app.use("/search-users",searchUser);
mongoose
  .connect(
"mongodb+srv://Parth_sharma:"+process.env.DB_PASS+"@cluster0.syfilge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(2003, () => console.log("listening on port 2003"));
