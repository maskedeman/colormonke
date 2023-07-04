import React, { useState, useEffect } from "react";
import ColorTiles from "./ColorTiles";
import { getPalette } from "./algo";

function Quant({ pixels }) {
  const [iterations, setIterations] = useState(3);
  const [palette, setPalette] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setPalette([]);
  }, [pixels]);

  const quantize = () => {
    const newPalette = getPalette(pixels, iterations);
    setPalette(newPalette);
    console.log("Quantizer invoked");
  };

  const handleIncrement = () => {
    let newValue = iterations + 1;
    if (newValue > 8) {
      setShowAlert(true);
      newValue = 8;
      setTimeout(() => {
        setShowAlert(false);
      }, 2000); // Hide the alert after 2 seconds
    } else {
      setShowAlert(false);
    }
    setIterations(newValue);
  };

  const handleDecrement = () => {
    let newValue = iterations - 1;
    newValue = Math.max(0, newValue); // Limit value between 0 and 8
    setIterations(newValue);
  };

  return (
    <div>
      {pixels.length > 0 && (
        <div>
          {showAlert && (
            <div className="alert">
              <span className="alert-close" onClick={() => setShowAlert(false)}>
                &times;
              </span>
              <div className="alert-message">
                The developer has set the iteration limit to 8 pitying your
                device. Otherwise, it can go on.
              </div>
            </div>
          )}
          <div className="counter">
            <button className="counter-button" onClick={handleDecrement}>
              -
            </button>
            <span className="counter-value">{iterations}</span>
            <button className="counter-button" onClick={handleIncrement}>
              +
            </button>
          </div>
          <button
            className="btn"
            id="upd"
            onClick={quantize}
            style={{
              border: "0",
              fontWeight: "519",
              fontSize: "17px",
              display: "block",
              margin: "0 auto",
              position: "relative",
              bottom: "170",
              left: "500",
              marginTop: "10",
            }}
          >
            Quantize {Math.pow(2, iterations)} colors
          </button>
        </div>
      )}
      {palette.length > 0 && <ColorTiles pixels={palette} />}
    </div>
  );
}

export default Quant;
