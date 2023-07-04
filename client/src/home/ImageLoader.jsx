import React from "react";
import { MapInteractionCSS } from "react-map-interaction";

function ImageLoader({ setPixels }) {
  const loadFile = (event) => {
    const fileList = event.target.files;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        setPixels(imageData.data);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(fileList[0]);
  };

  return (
    <div
      style={{
        width: "480px",
        height: "270px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label
        htmlFor="bbb"
        className="custom-file-upload"
        style={{ position: "absolute", zIndex: "2" }}
      >
        <b>+</b>
        <input
          id="bbb"
          type="file"
          accept="image/*"
          onChange={loadFile}
          style={{ display: "none" }}
        />
      </label>
      <MapInteractionCSS>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <canvas id="canvas" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
      </MapInteractionCSS>
    </div>
  );
}

export default ImageLoader;
