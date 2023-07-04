import React from "react";
import { Link } from "react-router-dom";
import "./details.less";

import { accountService } from "@/_services";

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div id="cont">
      <h1>My Profile</h1>
      <div className="profile-details">
        <p className="name">
          <strong>Name: </strong> {user.userName}
        </p>
        <p className="email">
          <strong>Email: </strong> {user.email}
        </p>
        <p className="btn-container">
          <Link to={`${path}/update`} className="btn" id="upd">
            Update Profile
          </Link>
        </p>
      </div>
    </div>
  );
}

export { Details };
