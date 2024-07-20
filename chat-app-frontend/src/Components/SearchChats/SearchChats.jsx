/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./SearchChats.scss";
function SearchChats() {
  const [chats, setChats] = useState([
    { name: "Parth sharma" },
    { name: "Parth sharma" },
    { name: "Parth sharma" },
  ]);
  const [searchResult, setSearchResults] = useState();
  // console.log(searchResult);
  const [visibility, setVisibility] = useState("hidden");
  useEffect(() => {
    const getUsers = async () => {
      const data = await axios("http://localhost:2003/search-users");
      console.log(data.data);
      setSearchResults(data.data);
      console.log(searchResult);
    };
    getUsers();
  }, []);
  function handleFriendRequest(uid) {

  }

  return (
    <>
      <div id="search-chats-div">
        <input
          type="text"
          name=""
          id=""
          onFocus={() => {
            setVisibility("visible");
          }}
        />

        <div id="chats-and-contacts">
          <div id="search-chat-results" style={{ visibility: visibility }}>
            <button
              id="close-button"
              onClick={() => {
                setVisibility("hidden");
              }}
            >
              ❌
            </button>

            <div id="search-result-container">
              {searchResult !== undefined &&
                searchResult.map((item) => {
                  return (
                    <div id="search-result">
                      <div id="text">
                        <p>{item.userInfo.name}</p>
                        <h6>{item.userInfo.email}</h6>
                      </div>
                      <button id="add-friend" onClick={() => handleFriendRequest(item.uid)}>
                        👥 
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
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
