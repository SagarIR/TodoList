import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { allTodo, todoDelete } from "../redux/actions/todoAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userTodo = useSelector((state) => state?.userTodo);
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todoId, setTodoId] = useState(null);

  useEffect(() => {
    dispatch(allTodo());
  }, [dispatch]);

  useEffect(() => {
    setTodos(userTodo?.todoInfo || []);
  }, [userTodo]);

  const handleEdit = (id) => {
    navigate(`/editTodo/${id}`);
  };

  const handleDelete = (id) => {
    setTodoId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(todoDelete(todoId))
      .then(() => {
        toast.success("Todo deleted successfully!");
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== todoId)
        );
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Error deleting todo: " + error.message);
        setShowModal(false);
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <Home />
      <div>
        <h2 className="text-center mt-4">Todos</h2>
        {todos?.loading ? (
          <div className="text-center">Loading...</div>
        ) : todos?.length === 0 ? (
          <h4 className="text-center text-danger mt-4">
            No todos available !!
          </h4>
        ) : (
          <div className="container mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos?.map((todo, index) => (
                  <tr key={todo._id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{moment(todo.dueDate).format("DD-MM-YYYY")}</td>
                    <td>{todo.status}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEdit(todo._id)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(todo._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal show={showModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TodoList;
