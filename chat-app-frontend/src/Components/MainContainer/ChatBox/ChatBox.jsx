/* eslint-disable react/jsx-key */
import { useState, useEffect, useRef} from "react";
import "./ChatBox.scss";
import {  socketContext } from "../../../App";
import { useContext } from "react";
import { addMessages } from "../../../slices/messagesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function ChatBox() {
  const messageRef = useRef();
  const socket = useContext(socketContext);
  const currentChat = useSelector((state) => state.activeChat.chatDetails);
  console.log(currentChat);
  const userData = useSelector((state) => state.user.userDetails);
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
  const socketId = useSelector((state) => state.socketId.socketId)
  const dispatch = useDispatch();
  function sendMessages() {
    socket.emit("message",{
      content:messageRef.current.value,
      sentBy:userData.id,
      senderMail:userData.userInfo.email,
      chatRoom:currentChat.room,
      senderId:socketId
    })
    document.getElementById("chats-box").scrollTop = document.getElementById("chats-box").scrollHeight;
    dispatch(addMessages({
      content:messageRef.current.value,
      sentBy:userData.id,
      senderMail:userData.userInfo.email,
      chatRoom:currentChat.room,
      senderId:socketId   
    }));
    messageRef.current.value = "";
  }
  
 
  return (
    <div id="chat-box-container">
      <input
        type="text"
        ref={messageRef}
        name=""
        id=""
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            sendMessages();
          }
        }}
      />
      <div id="chats-box">
        {messages.map((item) => {
          const userId = userData.id;
          console.log(item);
          let messageStyle = {
            textAlign: item.sentBy == userId ? "right" : "left",
            padding: "10px",
          };
          return (
            <div id="message" style={messageStyle}>
              <p id="user-name">{item.senderMail}</p>
              <p
                id="message-text"
                style={
                  item.sentBy == userId
                    ? { borderBottomRightRadius: "0", marginLeft: "auto" }
                    : { borderBottomLeftRadius: "0", marginRight: "auto" }
                }
              >
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ChatBox;
