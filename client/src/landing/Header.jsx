// import React, { useState } from "react";
// import { useHistory } from "react-router";

// function Header() {
//   const history = useHistory();
//   const [loginText, setLoginText] = useState("Login");

//   const handleLoginClick = () => {
//     if (loginText === "Login") {
//       setLoginText("Back");
//       history.push("/account/login");
//     } else {
//       setLoginText("Login");
//       history.goBack();
//     }
//   };

//   return (
//     <div className="header">
//       <div className="header-link" onClick={() => history.push("/")}>
//         Colors.
//       </div>
//       <div className="header-link" onClick={handleLoginClick}>
//         {loginText}
//       </div>
//     </div>
//   );
// }

// export { Header };
