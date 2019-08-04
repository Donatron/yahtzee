import React from "react";
import spinner from "../../img/spinner.gif";

import "./Spinner.css";

const Spinner = props => {
  return (
    <div className="Spinner">
      <img src={spinner} alt="" />
      <p>
        <em>Loading...</em>
      </p>
    </div>
  );
};

export default Spinner;
