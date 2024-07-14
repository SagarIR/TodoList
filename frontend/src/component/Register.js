import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersRegister } from "../redux/actions/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { USER_REGISTER_RESET } from "../constants/userconstants";
import * as Yup from "yup";
import Home from "./Home";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  mobile_no: "",
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  mobile_no: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Phone number is Required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, userInfo } = useSelector((state) => state.userRegister);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(usersRegister(values));
    resetForm();
  };

  useEffect(() => {
    if (userInfo) {
      toast.success(userInfo.message);
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch({ type: USER_REGISTER_RESET });
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
                <label htmlFor="firstname">First Name</label>
                <Field
                  type="text"
                  name="firstname"
                  className="form-control"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Field
                  type="text"
                  name="lastname"
                  className="form-control"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-danger"
                />
              </div>
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
              <div className="form-group">
                <label htmlFor="mobile_no">Phone No</label>
                <Field
                  type="text"
                  name="mobile_no"
                  className="form-control"
                  placeholder="Enter your phone no"
                />
                <ErrorMessage
                  name="mobile_no"
                  component="div"
                  className="text-danger"
                />
              </div>
              {error && <div className="text-danger">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
