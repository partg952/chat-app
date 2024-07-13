/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import "./Login.scss";
function Login() {
  const [color, setColor] = useState("red");
  const reader = new FileReader();
  const navigate = useNavigate();
  const [imageRef,setImageRef] = useState();
  const [file,setFile] = useState();
  const fileRef = useRef();
  const [animation, setAnimation] = useState(0);
  const [loginZindex, setLoginZindex] = useState(1);
  const [registerZindex, setRegisterZindex] = useState(-1);
  const [currentState, setCurrentState] = useState("login");
  const [formData, setFormData] = useState({});
  const [content, setContent] = useState("");
  const formRef = useRef();
  console.log(formData);
  function handleFormDataChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function onSubmitLogin() {
    if (formData.email != undefined && formData.password != undefined) {
      axios
        .post("http://localhost:2003/login", formData)
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
  function bringLoginUp() {
      setCurrentState("login");
      setLoginZindex(1);
      setRegisterZindex(-1);
  }
  function bringRegisterUp() {
     setCurrentState("register");
     setLoginZindex(-1);
     setRegisterZindex(1);
  }
  return (
    <div id="login-parent">
      <div id="login-container" style={{zIndex : loginZindex}}>
        <h1>App Name</h1>
        <form action="" ref={formRef} id="user-form" onSubmit={(e) => {
          e.preventDefault()
          console.log(e.target.value);

        }}>
          <input
            type="text"
            placeholder="Enter your email..."
            
            name="email"
            id=""
          />
          <br />
          <input
            type="text"
            
            name="password"
            placeholder="Enter your password.."
            id=""
          />
          <button onClick={() => {
            formRef.current.submit()
            }}>Login</button>
        </form>
        <p
          className="registration-link"
          onClick={bringRegisterUp}
        >
          New User? Click to register here..
        </p>
        <p id="message" style={{ color: color }}>
          {" "}
          {content}{" "}
        </p>
      </div>
      <div
        id="register-container"
        style={{ zIndex: registerZindex }}
        animation={animation}
      >
        <form action="">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
            alt=""
            onClick={() => {
              fileRef.current.click();
            }}
          />
          <input
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={(e) => {
              console.log(e.target.files[0]);
              reader.readAsArrayBuffer(e.target.files[0]);
            }}
            name=""
            id=""
          />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button>Register</button>
        </form>
        <p
          className="registration-link"
          onClick={bringLoginUp}
        >
          Already a user?Click here to login..
        </p>
      </div>
    </div>
  );
}
export default Login;
