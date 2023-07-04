import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./fp.less";
import { accountService, alertService } from "@/_services";
import fp from "../assets/fp.png";

function ForgotPassword() {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  function onSubmit({ email }, { setSubmitting }) {
    alertService.clear();
    accountService
      .forgotPassword(email)
      .then(() =>
        alertService.success(
          "Please check your email for password reset instructions"
        )
      )
      .catch((error) => alertService.error(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="fp-container">
      {" "}
      {/* Add a container for the login component */}
      <img src={fp} className="fp-image" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h3 className="card-header" id="f">
              Forgot Password
            </h3>
            <div className="card-body">
              <div className="form-group col-7">
                <label>Email</label>
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
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    id="fbtn"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Submit
                  </button>
                  <Link
                    to="login"
                    className="btn btn-link"
                    id="bk"
                    style={{ textDecoration: "none" }}
                  >
                    Back
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

export { ForgotPassword };
