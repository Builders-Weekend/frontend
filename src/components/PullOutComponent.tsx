import React from "react";
import AddDeviceForm from "./AddDeviceForm";
import "../styles/PullOutComponent.css";

interface IPullOutComponentProps {
  isOpen: boolean;
}

function PullOutComponent({ isOpen }: IPullOutComponentProps) {
  return (
    <div className="container">
      <div className={`pullout ${isOpen ? "open" : ""}`}>
        <div className="content">
          <AddDeviceForm />
        </div>
      </div>
    </div>
  );
}

export default PullOutComponent;
