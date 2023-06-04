import React from "react";
import AddDeviceForm from "./AddDeviceForm";
import { Devices } from "./Devices";
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
          <Devices />
        </div>
      </div>
    </div>
  );
}

export default PullOutComponent;
