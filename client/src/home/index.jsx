import React, { useState } from "react";

import Quant from "./Quantize";
import ImageLoader from "./ImageLoader";
import { accountService } from "@/_services";
import "./index.less";

const Home = () => {
  const user = accountService.userValue;
  const [pixels, setPixels] = useState([]);

  const handleSetPixels = (event) => {
    setPixels(event);
    console.log("Home invoked");
  };

  return (
    <div className="home-container">
      <div className="container" id="c">
        <h1>Hi {user && user.userName}!</h1>{" "}
        {/* Add a conditional check before accessing user.userName */}
        <span className="par">
          Upload an image below from which you want the{" "}
          <b className="colGrad">Color</b> <br />
          palettes.
        </span>
        <div className="up"></div>
        <h6>Upload File</h6>
        <span className="browse">To upload file click “+”</span>
        <div style={{ padding: "8px" }}>
          <ImageLoader setPixels={handleSetPixels} />

          <Quant pixels={pixels} />
        </div>
      </div>
    </div>
  );
};

export { Home };
