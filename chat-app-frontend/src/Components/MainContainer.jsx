import React from "react";
import './MainContainer.scss';  
import SearchChats from "./SearchChats";
import ChatBox from "./ChatBox";
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