import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { json, useNavigate } from "react-router";
import "../styles/signupform.css";

const Signupform = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    name: "",

    email: "",

    password: "",

    isLogin: false,
  });

  const [userdata, setuserdata] = useState({
    name: "",

    email: "",

    password: "",

    isLogin: false,
  });

  const signUpForm = () => {
    let loginData = localStorage.getItem("loginDetails");

    if (loginData == null) {
      loginData = [];

      loginData.push(login);

      localStorage.setItem("loginDetails", JSON.stringify(loginData));
    } else {
      let data = JSON.parse(loginData);

      data.push(login);

      localStorage.setItem("loginDetails", JSON.stringify(data));
    }

    localStorage.setItem("user", JSON.stringify(userdata));

    toast.success("Signup Successful");
    navigate("/Login");
  };

  return (
    <div className="signupformmain">

      <h1>Signup Form</h1>
      <h3>Name</h3>

      <input
        type="text"
        name="name"
        value={login.name}
        placeholder="Enter name"
        onChange={(e) => {
          setLogin({ ...login, [e.target.name]: e.target.value });
          setuserdata({ ...login, [e.target.name]: e.target.value });
        }}
        required
      />

      <br />

      <h3>Email</h3>

      <input
        type="email"
        name="email"
        value={login.email}
        placeholder="Enter email"
        onChange={(e) => {
          setLogin({ ...login, [e.target.name]: e.target.value });
          setuserdata({ ...login, [e.target.name]: e.target.value });
        }}
      />

      <br />

      <h3>Password</h3>

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={login.password}
        onChange={(e) => {
          setLogin({ ...login, [e.target.name]: e.target.value });
          setuserdata({ ...login, [e.target.name]: e.target.value });
        }}
        required
      />

      <br />

      <button onClick={signUpForm}>Signup</button>
    </div>
  );
};

export default Signupform;
