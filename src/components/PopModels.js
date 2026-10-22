import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../services/TodoServices";

const PopModels = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask,
}) => {
  //handle close
  const handleClose = () => {
    setShowModal(false);
  };
  //handle submit
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast.error("Please provide title or description");
      }

      const todo = await TodoServices.createTodo(data);
      setShowModal(false);
      toast.success("Task Created Successfully");
      console.log(todo);
      setTitle("");
      setDescription("");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PopModels;
