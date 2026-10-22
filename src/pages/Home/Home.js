import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModels from "../../components/PopModels";
import TodoServices from "../../services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [serachQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // Get user ID
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;

  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  //serach
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = allTask?.filter((item) =>
    item.title?.toLowerCase().includes(serachQuery.toLowerCase()),
  );
  //get user todos

  const getUserTask = useCallback(async () => {
    if (!id) {
      setAllTask([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getUserTask();
  }, [getUserTask]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>
          <input
            type="search"
            placeholder="search your task"
            value={serachQuery}
            onChange={handleSearch}
          />
          <button className="btn btn-primary" onClick={openModalHandler}>
            Create Task
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredTasks.length > 0 ? (
              <Card allTask={filteredTasks} getUserTask={getUserTask} />
            ) : (
              <p>
                {serachQuery
                  ? "No matching tasks found."
                  : "No tasks available. Create your first task!"}
              </p>
            )}
          </>
        )}
        {/*  Modals */}
        <PopModels
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default Home;
