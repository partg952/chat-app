import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from './Components/Login'
import SocketIOClient from 'socket.io-client';
import Socket from './Components/Socket';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer";
function App() {
  let socket = SocketIOClient("http://localhost:8080");
  return (
    <>
      <div>
        <Socket io={socket}/>
        <Router>
          <Routes>
            <Route path='/home' element={<MainContainer/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
