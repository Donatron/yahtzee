import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <p>
        {"\u00A9"} {new Date().getFullYear()}{" "}
        <a
          href="https://www.udemy.com/user/coltsteele/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Colt Steele
        </a>{" "}
        and{" "}
        <a
          href="https://donatron.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Don Macarthur
        </a>
      </p>
    </div>
  );
};

export default Footer;
