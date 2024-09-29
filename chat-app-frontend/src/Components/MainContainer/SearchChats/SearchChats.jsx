/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { addMessages,resetChats } from "../../../slices/messagesSlice";
import { socketContext } from "../../../App";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../../../slices/activeChat";
import "./SearchChats.scss";
function SearchChats() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const requestsUpdated = useSelector((state) => state.requestsUpdated.value);
  const currentChat = useSelector((state) => state.activeChat.chatDetails);
  let [joinedRooms, addRooms] = useState([]);
  const [chats, setChats] = useState([]);
  const [searchResult, setSearchResults] = useState();
  const [visibility, setVisibility] = useState("hidden");
  const [friends, setFriends] = useState([]);
  const socket = useContext(socketContext);
  console.log(currentChat);
  console.log(chats);
  
  useEffect(
    () => {
      console.log("in the fetch messages use effect");
      async function fetchMessages() {
        dispatch(resetChats());
        console.log("fetch messages function called");
          console.log("the current chat is not undefined");
          const messages = await axios.post(
            "http://localhost:2003/search-users/get-chats",
            {
              room: currentChat.room,
            }
          );
          dispatch(addMessages(messages.data));
          console.log(messages.data)
        
      }
      fetchMessages();
    },
    [currentChat]
  );
  useEffect(() => {
    setChats([]);
    const getFriends = async () => {
      const data = await axios.post(
        "http://localhost:2003/search-users/get-friends",
        { userId: userData.userDetails.id }
      );
      setFriends(data.data);
      console.log(data.data);
      data.data.forEach(async (user) => {
        const friend = await axios.post(
          "http://localhost:2003/search-users/get-user-info",
          { userId: user }
        );
        setChats((prev) => [...prev, friend.data]);
        console.log(friend); 
      });
      console.log(searchResult);
    };
    const getUsers = async () => {
      const data = await axios("http://localhost:2003/search-users");
      setSearchResults(data.data);
    };
    getFriends();
    getUsers();
    console.log(chats);
  }, [requestsUpdated]);

  async function handleFriendRequest(uid) {
    console.log(userData.userDetails.id);
    return new Promise((res, rej) => {
      !userData.userDetails.friends.includes(uid) && axios
        .post("http://localhost:2003/search-users/send-request", {
          userUid: userData.userDetails.id,
          friendUid: uid,
        })
        .then((succ) => {
          res(succ);
        })
        .catch((err) => {
          rej(err);
        });
    });
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
                  if(item.id!=userData.userDetails.id && !userData.userDetails.friends.includes(item.id)) {
                    return (
                    <div id="search-result">
                      <div id="text">
                        <p>{item.userInfo.name}</p>
                        <h6>{item.userInfo.email}</h6>
                      </div>
                      <button
                        id="add-friend"
                        onClick={() =>
                          handleFriendRequest(item.id)
                            .then((res) => {
                              console.log(res);
                              socket.emit("request_updated","");
                            })
                            .catch((err) => {
                              console.log(err);
                            })
                        }
                      >
                        👥
                      </button>
                    </div>
                  );
                }
                })}
            </div>
            </div>
          {(chats !== undefined && chats.length!=0) &&
            chats.map((item) => (
              <div
                id="chat-item"
                onClick={() => {
                  const roomname = `${userData.userDetails.id}and${item.id}`;
                  dispatch(
                    setCurrentChat({
                      reciever: item.userInfo.email,
                      recieverId: item.id,
                      room: roomname,
                    })
                  );
                  if (!joinedRooms.includes(roomname)) {
                    socket.emit("join_room", roomname);
                    addRooms(roomname);
                  }
                }}
              >
                <p>{item.userInfo.email}</p>
                <p>Active</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default SearchChats;
