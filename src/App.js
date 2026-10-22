import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landingpage/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";
import Todolist from "./pages/Todos/Todolist";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/todolist" element={<Todolist />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
