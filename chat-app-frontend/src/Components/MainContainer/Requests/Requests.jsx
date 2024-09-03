/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Requests.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { socketContext } from "../../../App";
import { useContext } from "react";
import { hide } from "../../../slices/requestsPageVisibility";
function Requests() {
  let userData = useSelector((state) => state.user.userDetails);
  let requestsChange = useSelector((state) => state.requestsUpdated.value);
  let [change,setChange] = useState(true);
  let [requests, setRequests] = useState([]);
  let socket = useContext(socketContext);
  console.log(userData.id);
  console.log(change);
 
  useEffect(() => {
    console.log("this has been triggered")
    setRequests([]);
    axios
      .post("http://localhost:2003/search-users/get-requests", {
        userId: userData.id,
      })
      .then((res) => {
        console.log(res.data);
        res.data.forEach((item) => {
          axios
            .post("http://localhost:2003/search-users/get-user-info", {
              userId: item,
            })
            .then((res2) => {
              setRequests((prev) => [...prev, res2.data]);
              console.log(res2.data);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [requestsChange]);
  let dispatch = useDispatch();
  let visibility = useSelector(
    (state) => state.requestsPageVisibility.visibility
  );
  return (
    <div id="requests-parent-container" style={{ visibility: visibility }}>
      <button id="close-button" onClick={() => dispatch(hide())}>
        ❌
      </button>
      <div id="requests">
        {requests.map((item) => {
          return (
            <div id="request-item">
              <p>{item.userInfo.email}</p>
              <div id="buttons">
                <button
                  id="accept-button"
                  onClick={() => {
                    if (!userData.friends.includes(item.id))
                    axios
                      .post(
                        "http://localhost:2003/search-users/accept-requests",
                        {
                          friendId: item.id,
                          userId: userData.id,
                        }
                      )
                      .then((succ) => {
                        console.log(succ);
                        socket.emit("request_updated");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  ✅
                </button>
                <button id="reject-button">❎</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Requests;
