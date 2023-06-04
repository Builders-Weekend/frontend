import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import JobQueue from "./components/JobQueue";
import { useEffect, useState } from "react";
import { Device, PricingData } from "./utils/types";
import axios from "axios";
import "./styles/App.css";
import TogglePullOutComponent from "./components/TogglePullOutComponent";
import PullOutComponent from "./components/PullOutComponent";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [pricingData, setPricingData] = useState<PricingData[]>([]);

  useEffect(() => {
    fetchDeviceData();
    fetchPricingData();
  }, []);

  async function fetchDeviceData() {
    try {
      const response = await axios.get("http://localhost:4000/api/devices");
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPricingData() {
    try {
      const response = await axios.get("http://localhost:4000/api/prices");
      setPricingData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="app-container">
      <Navbar />
      <LineChart />
      <JobQueue devices={devices} prices={pricingData} />
      <PullOutComponent isOpen={isOpen} />
      <TogglePullOutComponent setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default App;
