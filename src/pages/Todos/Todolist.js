import React, { useCallback, useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../services/TodoServices";
import Spinner from "../../components/Spinner";

const Todolist = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  //get user todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;
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

  const filteredTask = useMemo(() => {
    if (todoStatus === "incomplete") {
      return allTask.filter((item) => item?.isCompleted === false);
    }
    if (todoStatus === "completed") {
      return allTask.filter((item) => item?.isCompleted === true);
    }
  }, [todoStatus, allTask]);
  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos By: </h4>
        <div className="filter-group">
          <select
            className="form-select"
            onChange={(e) => setTodoStatus(e.target.value)}
          >
            <option selected>Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      {/* filter  */}
      {loading && <Spinner />}
      <div className="card-container">
        {filteredTask?.length === 0 ? (
          <h1 className="no task">No task Found</h1>
        ) : (
          filteredTask?.map((task, i) => (
            <>
              <div
                className="card border-primary mb-3 mt-3"
                style={{ maxWidth: "18rem" }}
                key={i}
              >
                <div className="card-header">
                  <div className="chead">
                    <h6>{task?.title.substring(0, 10)}</h6>
                    <h6
                      className={
                        task?.isCompleted === true ? "task-cmp" : "task-inc"
                      }
                    >
                      {task?.isCompleted === true ? "Completed" : "Incomplete"}
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                  <p className="card-text">{task?.description}</p>
                  <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Todolist;
