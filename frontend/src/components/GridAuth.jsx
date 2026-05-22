import "../styling/GridAuth.css";

import { useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const GridAuth = forwardRef(({_text}, _runSave) => {
  const [cells, setCells] = useState(Array(16).fill(false));
  let authCode;
  let isOkay = false;

  useImperativeHandle(_runSave, () =>({
    RunSave(){
      SaveAuth();
      return authCode;
      
      // if(isOkay){
      //   return authCode;
      // }
      // else{
      //   return false;
      // }
    }
  }));

  const toggleCell = (index) => {
    setCells((prev) => prev.map((cell, i) => (i === index ? !cell : cell)));
  };

  const SaveAuth = () => {
    const activeSquares = cells
      .map((isActive, index) => (isActive ? index : null))
      .filter((v) => v !== null);

      authCode = activeSquares.join("");

  };

  return (
    <div className="grid-container">
      <h4 className="grid-info">{_text[0]}</h4>
      <h6 className="grid-info">
        {!_text[1] ? "" : _text[1]}
      </h6>
      
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
    </div>
  );
});

export default GridAuth;
