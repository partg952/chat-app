/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import "./Login.scss";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [content, setContent] = useState("");
  console.log(formData);
  function handleFormDataChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function onSubmit() {
    axios
      .post("http://localhost:2003/login", formData)
      .then((data) => {
        console.log(data);
        if (formData.email != undefined && formData.password != undefined) {
          if (data.data.Message == "Login success") {
            navigate("/home");
          }
          setContent(data.data.Message);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div id="login-parent">
      <div id="login-container">
        <h1>App Name</h1>
        <form action="" id="user-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={handleFormDataChange}
            name="email"
            id=""
          />
          <br />
          <input
            type="text"
            onChange={handleFormDataChange}
            name="password"
            placeholder="Enter your password.."
            id=""
          />
          <button onClick={onSubmit}>Login</button>
        </form>
        <p>{content}</p>
      </div>
    </div>
  );
}
export default Login;
