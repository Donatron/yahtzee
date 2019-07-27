import React from "react";
import spinner from "../../img/spinner.gif";

import "./Spinner.css";

const Spinner = props => {
  return (
    <div className="Spinner">
      <img src={spinner} alt="" />
    </div>
  );
};

export default Spinner;
