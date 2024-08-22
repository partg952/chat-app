/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import "./MainContainer.scss";
import SearchChats from "./SearchChats/SearchChats";
import { useSelector } from "react-redux";
import Requests from "./Requests/Requests";
import ChatBox from "./ChatBox/ChatBox";
import Navbar from "./Navbar/Navbar";

function MainContainer() {
  const userInfo = useSelector((state) => state.user);
  const [requestsPageVisibility,setRequestsPageVisibility] = useState("hidden");
  console.log(userInfo);
  return (
    <>
      <div id="main-container-parent">
        <div id="main-container">
          <Navbar setRequestsPageVisibility={setRequestsPageVisibility} />
          <div id="main-content">
            <Requests visibility={requestsPageVisibility}/>
            <SearchChats />
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
}
export default MainContainer;
