import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { accountService, alertService } from "@/_services";
import "./update.less";

function Update({ history }) {
  const user = accountService.userValue;
  const initialValues = {
    userName: user.userName,
    email: user.email,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .update(user.id, fields)
      .then(() => {
        alertService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm("Are you sure?")) {
      setIsDeleting(true);
      accountService
        .delete(user.id)
        .then(() => alertService.success("Account deleted successfully"));
    }
  }
  const [isIconHovered, setIsIconHovered] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1>Update Profile</h1>

          <div className="cb ">
            <h3 className="he">Edit User</h3>
            <div className="form-row " id="upd">
              <div className="form-group col-5 ">
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

            <p className="note">*Leave blank to keep the same password</p>
            <div className="form-row" id="upd">
              <div className="form-group col-5">
                <label className="l3">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                  style={{ backgroundColor: "#8EB8B8" }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-6">
                <label className="l4">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                  style={{ backgroundColor: "#8EB8B8" }}
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
                  className="btn "
                  id="upd"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => onDelete()}
                  className="delb  "
                  style={{ width: "75px" }}
                  disabled={isDeleting}
                  onMouseEnter={() => setIsIconHovered(true)}
                  onMouseLeave={() => setIsIconHovered(false)}
                >
                  {isDeleting ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <FontAwesomeIcon
                      icon={isIconHovered ? faTrash : faPersonCircleMinus}
                      size="xl"
                      style={{ color: isIconHovered ? "#92332e" : "" }}
                      className={isIconHovered ? "shake-animation" : ""}
                    />
                  )}
                </button>
                <Link
                  to="."
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
      )}
    </Formik>
  );
}

export { Update };
