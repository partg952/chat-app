import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from './Components/Login/Login'
import SocketIOClient from 'socket.io-client';
import Socket from './Components/Socket';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/MainContainer";
function App() {
  return (
    <>
      <div>
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
