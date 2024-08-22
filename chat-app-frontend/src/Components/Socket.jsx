import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { addMessages } from "../slices/messagesSlice";
import { socketContext } from "../App";
import { useDispatch } from "react-redux";
import { addSocketId } from "../slices/socketId";
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
          message: message.content,
          sent: "friend",
        })
      );
    });
  }, []);
}
export default Socket;
