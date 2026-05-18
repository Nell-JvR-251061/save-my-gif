import "../styling/GridAuth.css";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GridAuth = () => {
  const [cells, setCells] = useState(Array(16).fill(false));

  const toggleCell = (index) => {
    setCells((prev) => prev.map((cell, i) => (i === index ? !cell : cell)));
  };

  const handleSave = () => {
    const activeSquares = cells
      .map((isActive, index) => (isActive ? index : null))
      .filter((v) => v !== null);

    const autCode = activeSquares.join("");

    console.log("Active squares:", activeSquares);
    console.log("Active squares:", autCode);
  };

  return (
    <div className="grid-container">
      <h4>Create a pattern</h4>
      <div className="grid">
        {cells.map((isActive, index) => (
          <button
            key={index}
            className={`cell ${isActive ? "active" : ""}`}
            onClick={() => toggleCell(index)}
          >
          </button>
        ))}
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Selected Squares
      </button>
    </div>
  );
};

export default GridAuth;
