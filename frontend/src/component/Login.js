import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usersLogin } from "../redux/actions/userActions";
import { USER_LOGIN_RESET } from "../constants/userconstants";
import Home from "./Home";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(usersLogin(values));
    resetForm();
  };

  useEffect(() => {
    if (userInfo) {
      toast.success(userInfo.message);
      navigate("/todoList");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch({ type: USER_LOGIN_RESET });
  }, [dispatch, error]);

  return (
    <>
      <Home />
      <div className="container mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
