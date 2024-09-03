import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { addMessages } from "../slices/messagesSlice";
import { socketContext } from "../App";
import { useDispatch } from "react-redux";
import { addSocketId } from "../slices/socketId";
import { change } from "../slices/requestChange";
import { useState } from "react";
function Socket() {
  const io = useContext(socketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    io.on("connection", (socket) => {
      console.log("connected to the server success!!");
      console.log(socket.id);
      dispatch(addSocketId(socket.id)); 
    });
    io.on("message", (message) => {
      console.log("recieved a message");
      console.log(message);
      dispatch(
        addMessages({
          content: message.content,
          sentBy:message.sentBy,
          senderMail:message.senderMail
        })
      );
    });
    io.on("request_updated",function() {
      console.log("reporting the requests change in the client side");
      dispatch(change());
    })
  }, []);
}
export default Socket;
