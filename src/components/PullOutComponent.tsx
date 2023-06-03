import React from "react";
import "../styles/PullOutComponent.css";

interface IPullOutComponentProps {
  isOpen: boolean;
}

function PullOutComponent({ isOpen }: IPullOutComponentProps) {
  return (
    <div className="container">
      <div className={`pullout ${isOpen ? "open" : ""}`}>
        <div className="content">
          <p>Content goes here</p>
        </div>
      </div>
    </div>
  );
}

export default PullOutComponent;
