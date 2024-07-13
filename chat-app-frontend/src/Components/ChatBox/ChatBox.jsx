/* eslint-disable react/jsx-key */
import { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";
import "./ChatBox.scss";
function ChatBox() {
  const io = SocketIOClient("http://localhost:8080/");
  const messageRef = useRef();
  function sendMessages() {
    setMessages([
      ...messages,
      { message: messageRef.current.value, sent: "user" },
    ]);
    messageRef.current.value = "";
  }
  useEffect(() => {
    io.on("connect", (socket) => {
      console.log("connected to the server successfully!!");
      console.log(socket.id);
    });
  }, []);
  const [messages, setMessages] = useState([
    { message: "hi how are you doing", sent: "user" },
    { message: "i am fine how about you", sent: "friend" },
  ]);
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
          let messageStyle = {
            textAlign: item.sent == "user" ? "right" : "left",
            padding: "10px",
          };
          return (
            <div id="message" style={messageStyle}>
              <p id="user-name">{item.sent}</p>
              <p
                id="message-text"
                style={
                  item.sent == "user"
                    ? { borderBottomRightRadius: "0", marginLeft: "auto" }
                    : { borderBottomLeftRadius: "0", marginRight: "auto" }
                }
              >
                {item.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ChatBox;
