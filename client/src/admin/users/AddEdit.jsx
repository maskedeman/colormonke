import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "@/_services";
import "../../profile/update.less";

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    userName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting);
    } else {
      updateUser(id, fields, setSubmitting);
    }
  }

  function createUser(fields, setSubmitting) {
    accountService
      .create(fields)
      .then(() => {
        alertService.success("User added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    accountService
      .update(id, fields)
      .then(() => {
        alertService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (!isAddMode) {
            // get user and set form fields
            accountService.getById(id).then((user) => {
              const fields = ["userName", "email", "role"];
              fields.forEach((field) =>
                setFieldValue(field, user[field], false)
              );
            });
          }
        }, []);

        return (
          <Form>
            <h1>{isAddMode ? "Add User" : "Edit User"}</h1>
            <div className="cb">
              <div className="form-row" id="upd">
                <div className="form-group col-1.5">
                  <label className="l2">Role</label>
                  <Field
                    name="role"
                    as="select"
                    className={
                      "form-control" +
                      (errors.role && touched.role ? " is-invalid" : "")
                    }
                    style={{ backgroundColor: "#8EB8B8" }}
                  >
                    <option value=""></option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-4">
                  <label className="l1">Username</label>
                  <Field
                    name="userName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.userName && touched.userName ? " is-invalid" : "")
                    }
                    style={{ backgroundColor: "#8EB8B8" }}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-6">
                  <label className="l2">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                    style={{ backgroundColor: "#8EB8B8" }}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              {!isAddMode && (
                <div>
                  <p className="note">*Leave blank to keep the same password</p>
                </div>
              )}
              <div className="form-row" id="upd">
                <div className="form-group col-4">
                  <label
                    className="l3"
                    style={{
                      position: "relative",
                      left: "15%",
                    }}
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                    style={{
                      backgroundColor: "#8EB8B8",
                      left: "15%",
                      width: "258px",
                      position: "relative",
                      marginRight: "70",
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-4 ">
                  <label
                    className="l4"
                    style={{ position: "relative", right: "50%" }}
                  >
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
                    style={{
                      backgroundColor: "#8EB8B8",
                      right: "50%",
                      width: "258px",
                      position: "relative",
                    }}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="button-group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn"
                    id="upd"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Update
                  </button>
                  <Link
                    to={isAddMode ? "." : ".."}
                    className="btn btn-link"
                    id="canc"
                    style={{ textDecoration: "none" }}
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { AddEdit };
