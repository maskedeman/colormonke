import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleMinus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { accountService } from "@/_services";
import "./list.less";

function List({ match }) {
  const { path } = match;
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    accountService.getAll().then((x) => {
      setUsers(x);
      setTotalUsers(x.length); // Update the total number of users
    });
  }, []);
  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    accountService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isEditIconHovered, setIsEditIconHovered] = useState(false);

  const filteredUsers = users?.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="card" id="cb_list">
        <div className="card-body" id="cb_list">
          <Link to={`${path}/add`} className="add-user-link">
            Add User
          </Link>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="total-users">{totalUsers} Users</p>
          <table className="table">
            <thead>
              <tr>
                <th style={{ color: "#B5B5C3" }}>Users</th>
                <th style={{ color: "#B5B5C3" }}>Email</th>
                <th style={{ color: "#B5B5C3" }}>Role</th>
                <th style={{ color: "#B5B5C3" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div>{user.userName}</div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link to={`${path}/edit/${user.id}`} className="btn">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          size="sm"
                          onMouseEnter={() => setIsEditIconHovered(user.id)}
                          onMouseLeave={() => setIsEditIconHovered(null)}
                          style={{
                            color:
                              isEditIconHovered === user.id ? "#257a7a" : "",
                          }}
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        className={`delb ${
                          isIconHovered === user.id ? "hovered" : ""
                        }`}
                        style={{ width: "60px" }}
                        disabled={user.isDeleting}
                        onMouseEnter={() => setIsIconHovered(user.id)}
                        onMouseLeave={() => setIsIconHovered(null)}
                      >
                        {user.isDeleting ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <FontAwesomeIcon
                            icon={
                              isIconHovered === user.id
                                ? faTrash
                                : faPersonCircleMinus
                            }
                            size="sm"
                            style={{
                              color: isIconHovered === user.id ? "#92332e" : "",
                            }}
                            className={
                              isIconHovered === user.id ? "shake-animation" : ""
                            }
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              {!users && (
                <tr>
                  <td colSpan="4" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { List };
