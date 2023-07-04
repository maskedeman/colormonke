import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.less";
import { accountService, alertService } from "@/_services";
import login from "../assets/login.png";

function Login({ history, location }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <div className="login-container">
      <img src={login} className="login-image" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h3 className="card-header" id="l">
              Log In
            </h3>
            <div className="card-body">
              <div className="form-group col-6">
                <label id="lm">Email</label>
                <Field
                  name="email"
                  type="text"
                  id="lm"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-6">
                <label id="lm" style={{ marginTop: "10px" }}>
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="lm"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    id="lm"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Log In
                  </button>
                  <span className="span">
                    <label id="lo">Not Registered?</label>
                    <Link
                      to="register"
                      className="btn btn-link"
                      style={{ textDecoration: "none" }}
                      id="su"
                    >
                      Sign Up
                    </Link>
                  </span>
                </div>
                <p className="or">Or</p>
                <div className="form-group col text-below">
                  <label id="lo">Did You</label>
                  <Link
                    to="forgot-password"
                    id="fp"
                    className="btn btn-link pr-0"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { Login };
