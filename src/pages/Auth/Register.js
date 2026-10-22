import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authstyle.css";
import AuthServices from "../../services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";
const Register = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [username, Setusername] = useState("");

  const navigate = useNavigate();
  //register function
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate("/login");
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
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => Setusername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => Setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => Setpassword(e.target.value)}
          />
        </div>
        <div className="form-bottom">
          <p className="test-center">
            already have a account? please
            <Link to="/login"> Login</Link>
          </p>
          <button type="submit" className="login-btn" onClick={registerHandler}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
