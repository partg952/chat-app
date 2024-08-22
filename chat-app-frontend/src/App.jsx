import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./Components/Login/Login";
import SocketIOClient from "socket.io-client";
import Socket from "./Components/Socket";
import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/MainContainer";
const socketContext = createContext();
function App() {
  let socket = SocketIOClient("http://localhost:2003/");
  return (
    <>
      <socketContext.Provider value={socket}>
        <div>
          <Router>
          <Socket  />
            <Routes>
              <Route path="/home" element={<MainContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </socketContext.Provider>
    </>
  );
}
export { socketContext };
export default App;
