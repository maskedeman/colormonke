import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.less";
import { accountService, alertService } from "@/_services";
import signupImage from "../assets/signup.png";

function Register({ history }) {
  console.log("SignUp loaded");
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required")
      .matches(
        /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        " Email couldn't start or finish with a dot,no spaces into the string,no special chars,could contain dots in the middle of mail address before the @,could contain a double domain "
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Terms & Conditions must  be accepted to continue"
    ),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    //console.log("Submitting registration form:", fields);
    accountService
      .register(fields)
      .then(() => {
        console.log("Registration successful");
        alertService.success(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("login");
      })
      .catch((error) => {
        console.log("Registration error:", error);
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <div className="register-container">
      <img src={signupImage} className="signup-image" />

      <div className="form-container"></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h3 className="card-header border-0">Sign Up</h3>
            <div className="card-body ">
              <div className="form-row ">
                <div className="form-group col-5 ">
                  <label id="re">Name</label>
                  <Field
                    name="userName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.userName && touched.userName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-7">
                  <label id="re">Email</label>
                  <Field
                    name="email"
                    type="text"
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
                </div>{" "}
              </div>
              <div className="form-row">
                <div className="form-group col-5">
                  <label id="re" style={{ marginTop: "20px" }}>
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
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
                <div className="form-group col">
                  <label id="re" style={{ marginTop: "20px" }}>
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={
                      "form-control" +
                      (errors.confirmPassword && touched.confirmPassword
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-group form-check">
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  className={
                    "form-check-input " +
                    (errors.acceptTerms && touched.acceptTerms
                      ? " is-invalid"
                      : "")
                  }
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I’ve read and agree with terms of service and our privacy
                  policy.
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  id="re"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Sign Up
                </button>
                <label id="login">
                  Already have an account ?
                  <span class="span">
                    <Link
                      to="login"
                      className="login"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      &nbsp; Log In
                    </Link>
                  </span>
                </label>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { Register };
