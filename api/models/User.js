const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: Buffer },
   
    user_bio: { type: String },
  },
  chats: [],
  friends: [],
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
