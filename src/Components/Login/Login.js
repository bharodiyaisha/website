import React, { useState,useEffect } from "react";
import { Button } from "@mui/material";
import "./login.scss";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [loginData, setLoginData] = useState(initialData);
  const [errors, setErrors] = useState(false);
  const [validation, setValidation] = useState(initialData);
  const navigate = useNavigate();

  const inputHandle = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (errors) {
      validator();
    }
  };

  const validator = () => {
    let errors = { ...initialData };
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;
    if (!loginData.email) {
      errors.email = "Email id is required";
      isValid = false;
    } else if (!regex.test(loginData.email)) {
      errors.email = "Enter valid email id";
      isValid = false;
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    setValidation(errors);
    return isValid;
  };

  const getData = (e) => {
    let user_records = JSON.parse(localStorage.getItem("registerData"));
    let user = user_records?.find((e) => {
      return e.email === loginData.email;
    });
    if (user) {
      if (user.password === loginData.password) {
        navigate("dashboard");
        localStorage.setItem("loginData", JSON.stringify([user]));
      } else {
        toast.warn("Wrong password");
      }
    } else {
      toast.warn("User does not exit");
    }
  };

  const onLogin = (e) => {
    if (validator()) {
      setErrors(false);
      e.preventDefault();
      getData();
    } else {
      setErrors(true);
    }
    e.preventDefault();
  };

  return (
    <div className="m_div">
    <div className="login-container">
      <div className="title">Login</div>
      <form>
        <div className="login-detail">
          <div className="input-box">
            <label className="detail">Email Id:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email id"
              value={loginData.email}
              onChange={inputHandle}
              required
            />
            {<p className="error">{validation.email}</p>}
          </div>
          <div className="input-box">
            <label className="detail"> Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={inputHandle}
              required
            />
            {<p className="error">{validation.password}</p>}
          </div>
          <div>
            <Button type="submit" className="btnLogin" onClick={onLogin} >
              Login
            </Button>
          </div>
          <div>
            <Link to="/register" className="hyper">
              Create Account
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;
