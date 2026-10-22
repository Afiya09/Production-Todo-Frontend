import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

//get user token
axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  const token = user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Created todo
const createTodo = (data) => {
  return axios.post(`${baseURL}/todo/create`, data);
};

//Get All todo
const getAllTodo = (id) => {
  return axios.post(`${baseURL}/todo/getAll/${id}`);
};

//Update Todo
const updateTodo = (id, data) => {
  return axios.patch(`${baseURL}/todo/update/` + id, data);
};

//Delete Todo
const deleteTodo = (id) => {
  return axios.delete("/todo/delete/" + id);
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
