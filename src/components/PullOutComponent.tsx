import React from "react";
import AddDeviceForm from "./AddDeviceForm";
import { Devices } from "./Devices";
import "../styles/PullOutComponent.css";
import { Device } from "../utils/types";

interface IPullOutComponentProps {
  isOpen: boolean;
  devices: Device[];
}

function PullOutComponent({ isOpen, devices }: IPullOutComponentProps) {
  return (
    <div className="container">
      <div className={`pullout ${isOpen ? "open" : ""}`}>
        <div className="content">
          <AddDeviceForm />
          <Devices devices={devices} />
        </div>
      </div>
    </div>
  );
}

export default PullOutComponent;
