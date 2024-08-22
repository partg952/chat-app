/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Requests.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

import { hide } from "../../../slices/requestsPageVisibility";
function Requests() {
  let userData = useSelector((state) => state.user.userDetails);
  let [requests, setRequests] = useState([]);
  console.log(userData.id);
  useEffect(() => {
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
  }, []);
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
