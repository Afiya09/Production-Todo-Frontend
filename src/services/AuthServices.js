import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

const registerUser = (data) => {
  return axios.post(`${baseURL}/user/register`, data);
};

const loginUser = (data) => {
  return axios.post(`${baseURL}/user/login`, data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;
