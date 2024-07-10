/* eslint-disable no-unused-vars */
import React from "react";
import './MainContainer.scss';  
import SearchChats from "../SearchChats/SearchChats";
import ChatBox from "../ChatBox/ChatBox";
function MainContainer(){
    return (
        <>
        <div id="main-container-parent">
            <div id="main-container">
                <SearchChats/>
                <ChatBox/>
            </div>
        </div>
        </>
    )
}
export default MainContainer;