import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state?.userLogin?.userInfo?.token
  );

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        iTechnosol
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ml-auto">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/todoList" className="nav-link">
                Todo List
              </Link>
              <Link to="/addTodo" className="nav-link">
                Add Todo
              </Link>
              <button onClick={handleLogOut} className="btn btn-link nav-link">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Home;
