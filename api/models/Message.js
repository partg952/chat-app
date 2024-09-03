const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    id: {type:String,required:true},
    content:String,
    sentBy:String,
    sentTo:String,
    chatRoom:String,
    senderMail:String,
});
const messageModel = mongoose.model("chats",messageSchema);

module.exports = messageModel;
