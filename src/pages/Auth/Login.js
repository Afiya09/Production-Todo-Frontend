import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authstyle.css";
import AuthServices from "../../services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //login function
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      navigate("/home");
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      console.log(res.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error.message);
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-bottom">
          <p className="test-center">
            not a user? please
            <Link to="/register"> Register</Link>
          </p>
          <button type="submit" className="login-btn" onClick={loginHandler}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
