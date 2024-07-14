import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/Login";
import Register from "./component/Register";
import TodoList from "./component/TodoList";
import TodoForm from "./component/TodoForm";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userInfo ? <Navigate to="/todoList" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/todoList"
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            }
          />
          <Route
            path="/addTodo"
            element={
              <PrivateRoute>
                <TodoForm isEditMode={false} />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTodo/:id"
            element={
              <PrivateRoute>
                <TodoForm isEditMode={true} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
