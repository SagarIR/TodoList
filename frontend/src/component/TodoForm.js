import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTodo, updateTodo } from "../redux/actions/todoAction";
import Home from "./Home";

const TodoForm = ({ isEditMode = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const todo = useSelector((state) =>
    state?.userTodo?.todoInfo.find((todo) => todo._id === id)
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    if (isEditMode && todo) {
      setFormData(todo);
    }
  }, [isEditMode, todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(
        updateTodo(id, {
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          status: formData.status,
        })
      )
        .then(() => {
          toast.success("Todo updated successfully!");
          navigate("/todoList");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    } else {
      dispatch(addTodo(formData))
        .then(() => {
          toast.success("Todo added successfully!");
          navigate("/todoList");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  return (
    <>
      <Home />
      <div className="container mt-4">
        <h2>{isEditMode ? "Edit Todo" : "Add Todo"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {isEditMode ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
    </>
  );
};

export default TodoForm;
