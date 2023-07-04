import React, { useState, useEffect } from "react";
import { NavLink, Route, useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Role } from "@/_helpers";
import { accountService } from "@/_services";
import "./nav.less";

function Nav() {
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => {
      setUser(x);
      setDropdownOpen(false); // Reset dropdown state on user change
    });
    return subscription.unsubscribe;
  }, []);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
    setIsBouncing(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setIsBouncing(false);
  };

  // only show nav when logged in
  if (!user) return null;

  const handleDashboardClick = () => {
    history.push("/admin/users"); // Set the desired path here
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-transparent">
        <div
          className="navbar-nav mr-auto"
          style={{ marginLeft: "8%", marginTop: "1%" }}
        >
          <NavLink
            exact
            to="/"
            className="nav-item nav-link navbar-dark bg-transparent"
            id="gradCol"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: "32px",
            }}
          >
            Colors.
          </NavLink>
        </div>
        <div className="navbar-nav ml-auto">
          <div
            className="nav-item dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "pointer" }}
          >
            <span
              className={`nav-link dropdown-toggle ${
                isBouncing ? "bounce" : ""
              }`}
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              style={{ marginLeft: "-100%", marginTop: "1%" }}
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                style={{ color: "#50AA8F" }}
              />{" "}
            </span>
            <div
              className={`dropdown-menu dropdown-menu-right ${
                dropdownOpen ? "show dropdown-float" : ""
              }`}
              aria-labelledby="navbarDropdown"
              style={{
                color: "#000000",
                backgroundColor: "#ffffff",
                border: "none",
              }}
            >
              {user.role === Role.Admin && (
                <a
                  onClick={handleDashboardClick}
                  className="dropdown-item"
                  style={{ color: "#7FA64D", cursor: "pointer" }}
                >
                  Dashboard
                </a>
              )}
              <NavLink
                to="/profile"
                className="dropdown-item"
                activeClassName="selected"
                style={{ color: "#7FA64D" }}
              >
                View Profile
              </NavLink>
              <div className="dropdown-divider"></div>
              <a
                onClick={accountService.logout}
                className="dropdown-item"
                style={{ color: "#7FA64D" }}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="shake"
                  style={{
                    color: "#7FA64D",
                    transition: "color 0.3s quick-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "red";
                  }}
                  shake
                  onMouseLeave={(e) => {
                    e.target.style.color = "#7FA64D";
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Route path="/admin" component={AdminNav} />
    </div>
  );
}

function AdminNav({ match }) {
  const { path } = match;
  const location = useLocation();
  const [showUsersLink, setShowUsersLink] = useState(true);

  useEffect(() => {
    // Check if the current location matches the Users NavLink
    if (location.pathname === `${path}/users`) {
      setShowUsersLink(false);
    } else {
      setShowUsersLink(true);
    }
  }, [location, path]);

  if (!showUsersLink) return null; // Return nothing if showUsersLink is false

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink
          to={`${path}/users`}
          className="nav-item nav-link"
          activeClassName="selected"
          style={{ color: "#7FA64D" }}
        >
          Users
        </NavLink>
      </div>
    </nav>
  );
}
export { Nav };
