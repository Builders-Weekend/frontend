import React from "react";
import AddDeviceForm from "./AddDeviceForm";
import { Devices } from "./Devices";
import "../styles/PullOutComponent.css";
import { Device } from "../utils/types";

interface IPullOutComponentProps {
  isOpen: boolean;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

function PullOutComponent({ isOpen, devices, setDevices }: IPullOutComponentProps) {
  return (
    <div className="container">
      <div className={`pullout ${isOpen ? "open" : ""}`}>
        <div className="content">
          <AddDeviceForm devices={devices} setDevices={setDevices} />
          <Devices devices={devices} />
        </div>
      </div>
    </div>
  );
}

export default PullOutComponent;
