import React from "react";
import "./Logo.css";

const Logo = ({ showTagline = true, className = "" }) => {
  return (
    <div className={`common-logo ${className}`}>
      <i className="bi bi-airplane-fill logo-icon-main"></i>
      <div className="logo-text-main">
        <h2>travel planner</h2>
        {showTagline && <p>your smart travel companion</p>}
      </div>
    </div>
  );
};

export default Logo;
