/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { useRef, useState } from "react";
import "./Login.scss";
function Login() {
  const [color, setColor] = useState("red");
  const reader = new FileReader();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [file, setFile] = useState();
  const fileRef = useRef();
  const [loginZindex, setLoginZindex] = useState(1);
  const [registerZindex, setRegisterZindex] = useState(-1);
  const [formDataLogin, setFormDataLogin] = useState({});
  const [formDataRegister, setFormDataRegister] = useState({});
  const [content, setContent] = useState("");
  console.log(formDataLogin);
  console.log(Object.keys(formDataRegister));
  console.log(formDataRegister);
  function handleFormDataChangeLogin(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  }

  function handleFormDataRegister(e) {
    const name = e.target.name;
    const value = e.target.value;
    value.length != 0
      ? setFormDataRegister({
          ...formDataRegister,
          [name]: value,
        })
      : delete formDataRegister[name];
    console.log(formDataRegister);
  }
  function onSubmitLogin() {
    if (
      formDataLogin.email != undefined &&
      formDataLogin.password != undefined
    ) {
      console.log(formDataLogin.width);
      axios
        .post("http://localhost:2003/login", formDataLogin)
        .then((data) => {
          console.log(data);
          if (data.data.Message == "Login success") {
            setColor("#0d7004");
            navigate("/home");
          }
          setContent(data.data.Message);
        })
        .catch((err) => console.log(err));
    } else {
      setContent("Enter both email and password");
    }
  }
  function onSubmitRegister() {
    if (
      Object.keys(formDataRegister).length == 4 &&
      formDataRegister.password == formDataRegister["confirm-password"]
    ) {
      const formData = new FormData();
      console.log(formDataRegister.email);
      formData.append("userEmail", formDataRegister.email);
      formData.append("userName", formDataRegister.username);
      formData.append("password", formDataRegister.password);
      formData.append("profile_pic", file);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post("http://localhost:2003/register", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.Message == "The user has been saved") {
            navigate("/home");
          } else {
            alert("some error occured please try again");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function bringLoginUp() {
    setLoginZindex(1);
    setRegisterZindex(-1);
  }
  function bringRegisterUp() {
    setLoginZindex(-1);
    setRegisterZindex(1);
  }
  return (
    <div id="login-parent">
      <div id="login-container" style={{ zIndex: loginZindex }}>
        <h1>App Name</h1>
        <form action="" id="user-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={handleFormDataChangeLogin}
            name="email"
            id=""
          />
          <br />
          <input
            type="text"
            onChange={handleFormDataChangeLogin}
            name="password"
            placeholder="Enter your password.."
            id=""
          />
          <button onClick={onSubmitLogin}>Login</button>
          <p className="registration-link" onClick={bringRegisterUp}>
            New User? Click to register here..
          </p>
          <p id="message" style={{ color: color }}>
            {" "}
            {content}{" "}
          </p>
        </form>
      </div>
      <div id="register-container" style={{ zIndex: registerZindex }}>
        <h1>App Name</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={
              url === ""
                ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                : url
            }
            alt=""
            onClick={() => {
              fileRef.current.click();
            }}
          />
          <input
            accept="image/png image/jpg image/jpeg"
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={function (e) {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]);
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                setUrl(reader.result);
                console.log(reader.result);
              };
            }}
            name=""
            id=""
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email ..."
            onChange={handleFormDataRegister}
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your username ..."
            onChange={handleFormDataRegister}
          />
          <input
            type="text"
            name="password"
            placeholder="Enter your password ..."
            onChange={handleFormDataRegister}
          />
          <input
            type="text"
            name="confirm-password"
            placeholder="Confirm your password ..."
            onChange={handleFormDataRegister}
          />
          <button onClick={onSubmitRegister}>Register</button>
          <p className="registration-link" onClick={bringLoginUp}>
            Already a user?Click here to login..
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
