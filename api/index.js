const express = require("express");
require("dotenv").config();
console.log(process.env.MONGODB_URL);
const RegisterUser = require("./controllers/auth/registerUser.js");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const LoginUser = require("./controllers/auth/loginUser.js");
const searchUser = require("./controllers/user-actions/user-actions.js");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cors());
app.use("/register", RegisterUser);
app.use("/login", LoginUser);
app.use("/search-users", searchUser);
mongoose
  .connect(
    "mongodb+srv://Parth_sharma:" +
      process.env.DB_PASS +
      "@cluster0.syfilge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (device) => {
  console.log("a device connected : ", device.id);
  device.on("join_room", (room) => {
    device.join(room);
    console.log(room);
    console.log("user that joined the room" + device.id);
  });
  device.on("message", (message) => {
    console.log(`message : ${message.content} room:${message.room}`);
    device.to(message.room).except(message.senderId ).emit("message", {
      content: message.content,
      sent: message.sentBy,
      room: message.room,
    });
  });
});
server.listen(2003, () => console.log("listening on port 2003"));
