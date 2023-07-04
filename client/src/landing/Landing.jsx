import React from "react";
import { Link } from "react-router-dom";
import "./landing.less";

import { useHistory } from "react-router-dom";

function Landing() {
  console.log("Landing Loaded");
  const history = useHistory();
  const [loginText, setLoginText] = React.useState("Login");

  const handleLoginClick = () => {
    if (loginText === "Login") {
      setLoginText("Back");
      history.push("/account/login");
    } else {
      setLoginText("Login");
      history.goBack();
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header-link" onClick={() => history.push("/")}>
          Colors.
        </div>
        <div className="header-link" onClick={handleLoginClick}>
          {loginText}
        </div>
      </div>
      <div className="cat">
        <div className="dis_text">
          <h5>
            <span id="with"> With </span>

            <b>COLORS. </b>

            <span id="an">
              the user can get the palette of the color
              <br />
              <div1>from the given image .</div1>
              <br />
              <div id="con"> To continue please Login.</div>
              <Link to="/account/register">
                <button className="signupbt">Sign Up</button>
              </Link>{" "}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export { Landing };
