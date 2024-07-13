/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import "./SearchChats.scss";
function SearchChats() {
  const [chats, setChats] = useState([
    { name: "Parth sharma" },
    { name: "Parth sharma" },
    { name: "Parth sharma" },
  ]);
  return (
    <>
      <div id="search-chats-div">
        <input type="text" name="" id="" />
        <div id="chats-and-contacts">
          {chats.map((item) => (
            <div id="chat-item">
              <p>{item.name}</p>
              <p>Active</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default SearchChats;
