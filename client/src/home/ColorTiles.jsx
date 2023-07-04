import React, { useMemo, useState } from "react";
var namer = require("color-namer");

function ColorTiles({ pixels }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const uniqueColors = useMemo(() => {
    const colors = new Set();
    const uniqueColors = [];
    const p = pixels;

    for (let i = 0; i < p.length; i += 4) {
      const rgba = `rgba(${p[i]},${p[i + 1]},${p[i + 2]},${p[i + 3]})`;
      const hex = rgbToHex(p[i], p[i + 1], p[i + 2]);
      const colorNames = namer(hex).ntc;

      if (!colors.has(rgba)) {
        colors.add(rgba);
        uniqueColors.push({
          rgba,
          hex,
          colorName: colorNames.length > 0 ? colorNames[0].name : "Unknown",
        });
      }
    }

    console.log("Tiles invoked");
    return uniqueColors;
  }, [pixels]);

  function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function getTextColor(rgba) {
    // Extract RGB values from RGBA string
    const [r, g, b] = rgba.match(/\d+/g);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Determine suitable text color based on luminance
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  function handleMouseEnter(index) {
    setHoveredIndex(index);
  }

  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  return (
    <div className="color-tiles-container">
      <div className="color-tiles">
        {pixels.length > 0 &&
          uniqueColors.map((color, index) => (
            <div
              key={index}
              style={{
                background: color.rgba,
                color: getTextColor(color.rgba),
                margin: "4px",
                // position: "absolute",
                // left: `${Math.random() * 100}vw`, // tiles appear all over the screen randomly and runs on mouse action
                // top: `${Math.random() * 100}vh`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {color.hex}
              {hoveredIndex === index && (
                <div
                  style={{
                    fontSize: "12px",
                    color: getTextColor(color.rgba),
                  }}
                >
                  {color.colorName}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ColorTiles;
